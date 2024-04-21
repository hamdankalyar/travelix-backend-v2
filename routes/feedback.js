const express = require("express");
const { Feedback, ValidateFeedback } = require("../models/feedback"); // Adjust the import path as needed
const { Vehicle, ValidateVehicle } = require("../models/vehicle"); // Adjust the import path as needed
const { Hotel, ValidateHotel } = require("../models/hotel"); // Adjust the import path as needed
const { Tour, ValidateTour } = require("../models/tourPackage"); // Adjust the import path as needed

// Remove the existing declaration of 'router'
const router = require("express").Router();

// Get all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("user"); // Assuming 'userId' is the field referencing the User table
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get feedback by ID
router.get("/:id", getFeedback, (req, res) => {
  res.json(res.feedback);
});

// Create new feedback
router.post("/", async (req, res) => {
  const feedback = new Feedback({
    user: req.body.user,
    targetId: req.body.targetId,
    rating: req.body.rating,
    comment: req.body.comment,
  });

  try {
    const newFeedback = await feedback.save();
    // Determine the target type and update the corresponding collection
    const car = await Vehicle.findById(req.body.targetId);
    const hotel = await Hotel.findById(req.body.targetId);
    const tour = await Tour.findById(req.body.targetId);


    if (car) {
      await Vehicle.findByIdAndUpdate(req.body.targetId, {
        $push: { feedbacks: newFeedback._id },
        $inc: { noOfReviews: 1 },
      });
      await updateRating(Vehicle, req.body.targetId);
    } else if (hotel) {
      await Hotel.findByIdAndUpdate(req.body.targetId, {
        $push: { feedbacks: newFeedback._id },
        $inc: { noOfReviews: 1 },
      });
      await updateRating(Hotel, req.body.targetId);
    } else if (tour) {
      await Tour.findByIdAndUpdate(req.body.targetId, {
        $push: { feedbacks: newFeedback._id },
        $inc: { noOfReviews: 1 },
      });
      await updateRating(Tour, req.body.targetId);

    } else {
      throw new Error("Invalid target ID");
    }

    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Function to update the average rating of a product
async function updateRating(model, targetId) {
  const product = await model.findById(targetId).populate("feedbacks");
  if (product) {
    const totalRating = product.feedbacks.reduce(
      (acc, curr) => acc + curr.rating,
      0
    );
    const averageRating = totalRating / product.feedbacks.length;
    await model.findByIdAndUpdate(targetId, {
      $set: { rating: averageRating },
    });
  }
}

router.get("/product/:targetId", async (req, res) => {
  const { targetId } = req.params;
  try {
    const feedbacks = await Feedback.find({ targetId })
      .populate("response") // Populate the response field
      .populate("user", "name role") // Example to populate user field with username. Adjust according to your User schema.
      .exec();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Middleware to get feedback by ID
async function getFeedback(req, res, next) {
  let feedback;
  try {
    feedback = await Feedback.findById(req.params.id);
    if (feedback == null) {
      return res.status(404).json({ message: "Cannot find feedback" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.feedback = feedback;
  next();
}

module.exports = router;
