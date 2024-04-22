const express = require("express");
const router = express.Router();
const { HotelBooking, ValidateBooking } = require("../models/hotelbooking");
const mongoose = require("mongoose");
const authHandler = require("../middleware/auth");
const Stripe = require("stripe");
const stripe = new Stripe(
  "sk_test_51P6FSHJ8YlrI7gTXmcjhjVeM4TnzNhU4oSr3eVOznhniTznh9rfeE8Aqx9sgbpStT28sxw8UAJyHG6yJJq0YTJ6Y00ovQ09B5Q"
);

router.post("/mobile", async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    const booking = new HotelBooking(req.body);

    // Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: booking.bookedItem.price,
      currency: "usd",
      payment_method: paymentMethod.id,
      automatic_payment_methods: { enabled: true },
    });

    // Save the booking into the database
    booking.isStatus = true;
    await booking.save();

    // Send the clientSecret back to the client
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error while creating payment intent:", error);
    res.status(500).send({ error: error.message });
  }
});
router.post("/check-availability", async (req, res) => {
  try {
    const { startDate, finishDate, hotelId } = req.body;

    console.log(hotelId);
    console.log(startDate, finishDate);
    // Retrieve all bookings for the specific vehicle ID
    const bookings = await HotelBooking.find({
      "bookedItem.item": hotelId,
    });

    console.log(bookings);

    // Check for overlap with each existing booking
    const isOverlapping = bookings.some((booking) => {
      const bookingStartDate = new Date(
        booking.bookedItem.bookingDate.startDate
      );
      const bookingFinishDate = new Date(
        booking.bookedItem.bookingDate.finishDate
      );

      // Convert start and finish dates to Date objects
      const selectedStartDate = new Date(startDate);
      const selectedFinishDate = new Date(finishDate);

      // Check if the selected date range overlaps with the booking date range
      return (
        (selectedStartDate >= bookingStartDate &&
          selectedStartDate <= bookingFinishDate) || // Check if the start date falls within the booking range
        (selectedFinishDate >= bookingStartDate &&
          selectedFinishDate <= bookingFinishDate) || // Check if the finish date falls within the booking range
        (selectedStartDate <= bookingStartDate &&
          selectedFinishDate >= bookingFinishDate) // Check if the selected range spans the entire booking range
      );
    });

    console.log(isOverlapping);

    if (isOverlapping) {
      // Send a response indicating that the selected date range overlaps with existing bookings
      res
        .status(400)
        .send(
          "The selected date range overlaps with existing bookings for this Hotel."
        );
    } else {
      // Send a response indicating that the selected date range is available
      res.status(200).send("The selected date range is available for booking.");
    }
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET all hotel bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await HotelBooking.find();
    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// GET a specific hotel booking by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid booking ID");
  }
  try {
    const booking = await HotelBooking.findById(id);
    if (!booking) {
      return res.status(404).send("Booking not found");
    }
    res.status(200).send(booking);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// POST a new hotel booking
router.post("/", async (req, res) => {
  //   const { error } = ValidateBooking(req.body);
  //   if (error) {
  //     return res.status(400).send(error.details[0].message);
  //   }
  try {
    // const stripe = new Stripe(
    //   "sk_test_51MpYaDSGTswR1vciQcDNb47pImQECcrTwmD7kFGaiGSUV67WNHfz7poKR7OEJCV0XuNCJoCwSDSiuAWGJMoGazeV00yHqaX7VU"
    // );

    const { paymentMethod } = req.body;
    const booking = new HotelBooking(req.body);
    await stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      currency: "PKR",
      amount: 100 * booking.bookedItem.price,
      confirm: true,
      description: `${booking.bookedUserInfo.fullName} booked this Hotel`,
      return_url: "http://localhost:5173/", // Replace this with your actual return URL
    });

    booking.isStatus = true;
    await booking.save();
    res.status(200).send(booking);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT (update) a hotel booking
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid booking ID");
  }
  try {
    const updatedBooking = await HotelBooking.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBooking) {
      return res.status(404).send("Booking not found");
    }
    res.status(200).send(updatedBooking);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// DELETE a hotel booking
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid booking ID");
  }
  try {
    const deletedBooking = await HotelBooking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).send("Booking not found");
    }
    res.status(200).send(deletedBooking);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// GET bookings of all vehicles owned by a specific vehicle owner
router.get("/owner/:ownerId", async (req, res) => {
  try {
    // Populate the bookedItem.item field with vehicle details
    const bookings = await HotelBooking.find().populate({
      path: "bookedItem.item",
      match: { hotelOwner: req.params.ownerId },
    });

    // Filter out bookings where the bookedItem.item is not populated
    const filteredBookings = bookings.filter(
      (booking) => booking.bookedItem.item
    );

    res.send(filteredBookings);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
