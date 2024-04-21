
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { Tour, ValidateTour } = require("../models/tourPackage");
const auth = require("../middleware/auth");
const _ = require("lodash");
const isTourOwner = require("../middleware/tourOwner");
const { User } = require("../models/user");

//Get all Tours
router.get("/", async (req, res) => {
  const tours = await Tour.find().populate("feedbacks");
  res.status(200).send(tours);
});

// GET total count
router.get("/count", async (req, res) => {
  try {
    const count = await Tour.countDocuments(); // Correctly call countDocuments() on the Car model
    res.json({ total: count }); // Send the count as a response
  } catch (error) {
    console.error("Error stack:", error.stack); // Log the error stack
    res.status(500).send("Internal Server Error");
  }
});

// Get a Tour by a specific ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Id!");
  }
  try {
    const tour = await Tour.findById(id)
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
      .populate("tourOwner", "name email image");

    if (!tour) {
      return res.status(404).send("No Tour found");
    }
    res.status(200).send(tour);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//Only Travel club owner can create Travel Package
//Create a new Tour
router.post("/", async (req, res) => {
  const { error } = ValidateTour(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  console.log("No error");

  const tour = new Tour({
    place: req.body.place,
    title: req.body.title,
    tourOwner: req.body.tourOwner,
    description: req.body.description,
    images: req.body.images,
    duration: req.body.duration,
    personsAllowed: req.body.personsAllowed,
    noOfPersonsLeft: req.body.personsAllowed, 
    amenities: req.body.amenities,
    availableDates: req.body.availableDates,
    price: req.body.price,
    
  });

  try {
    console.log(tour);
    await tour.save();
    console.log("tour Saved");
    res.status(200).send(tour);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

//Update the Tour
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Id!");
  }
  const tour = await Tour.findByIdAndUpdate(id, req.body, { new: true });
  if (!tour) {
    return res.status(404).send("Tour not found");
  }
  return res.status(200).send(tour);
});

// Delete the Tour
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Id!");
  }
  const tour = await Tour.findByIdAndDelete(id);
  if (!tour) {
    return res.status(404).send("Tour not found");
  }
  return res.status(200).send(tour);
});

router.get("/user/:ownerId", async (req, res) => {
  try {
    // Query tours based on owner ID
    const tours = await Tour.find({ tourOwner: req.params.ownerId });

    if (!tours) {
      return res.status(404).send("No tours found for the specified owner ID");
    }

    res.status(200).send(tours);
  } catch (error) {
    console.error("Error fetching tours:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
