const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Hotel, ValidateHotel } = require("../models/hotel");

// Get all Hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    console.log("New Console");

    res.status(200).send(hotels);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// GET total count
router.get("/count", async (req, res) => {
  try {
    const count = await Hotel.countDocuments(); // Correctly call countDocuments() on the Car model
    res.json({ total: count }); // Send the count as a response
  } catch (error) {
    console.error("Error stack:", error.stack); // Log the error stack
    res.status(500).send("Internal Server Error");
  }
});

// Get a hotel by a specific ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Id!");
  }
  try {
    const hotel = await Hotel.findById(id)
      .populate({
        path: "feedbacks",
        populate: [
          { path: "user", select: "name" },
          {
            path: "response",
            populate: { path: "owner", select: "name comment" },
          },
        ],
      })
      .populate("hotelOwner", "name email image");

    if (!hotel) {
      return res.status(404).send("No Hotel found");
    }
    res.status(200).send(hotel);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Only Hotel Owner can create a hotel
// Create a new hotel

router.post("/", async (req, res) => {
  const { error } = ValidateHotel(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const hotel = new Hotel(req.body);

  try {
    await hotel.save();
    res.status(200).send(hotel);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update the hotel
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Id!");
  }
  try {
    const hotel = await Hotel.findByIdAndUpdate(id, req.body, { new: true });
    if (!hotel) {
      return res.status(404).send("Hotel not found");
    }
    res.status(200).send(hotel);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Delete the hotel
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Id!");
  }
  try {
    const hotel = await Hotel.findByIdAndDelete(id);
    if (!hotel) {
      return res.status(404).send("Hotel not found");
    }
    res.status(200).send(hotel);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const hotels = await Hotel.find({ hotelOwner: req.params.userId });
    res.send(hotels);
  } catch (error) {
    console.error("Error stack:", error.stack);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
