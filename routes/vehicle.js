const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Vehicle, ValidateVehicle } = require("../models/vehicle");



// GET all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.send(vehicles);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
// GET total count of vehicles
router.get("/count", async (req, res) => {
  try {
    const count = await Vehicle.countDocuments(); // Correctly call countDocuments() on the vehicle model
    res.json({ total: count }); // Send the count as a response
  } catch (error) {
    console.error("Error stack:", error.stack); // Log the error stack
    res.status(500).send("Internal Server Error");
  }
});

// GET specific vehicle by ID
router.get("/:id", async (req, res) => {
  try {
    console.log("Getting a specific vehicle");
    const vehicle = await Vehicle.findById(req.params.id)
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
      .populate("vehicleOwner", "name email image");

    if (!vehicle) return res.status(404).send("vehicle not found");
    res.send(vehicle);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// POST a new vehicle
router.post("/", async (req, res) => {
  const { error } = ValidateVehicle(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let vehicle = new Vehicle(req.body);
    vehicle = await vehicle.save();
    res.send(vehicle);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT update a vehicle by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send("Invalid Id!");
  }
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!vehicle) return res.status(404).send("vehicle not found");
    res.send(vehicle);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// DELETE a vehicle by ID
router.delete("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) return res.status(404).send("Vehicle not found");
    res.send(vehicle);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});
router.get("/user/:userId", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ vehicleOwner: req.params.userId });
    res.send(vehicles);
  } catch (error) {
    console.error("Error stack:", error.stack);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
