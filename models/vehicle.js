const mongoose = require("mongoose");
const Joi = require("joi");
const { Feedback } = require("./feedback");
const vehicleSchema = new mongoose.Schema({
  vehicleModel: { type: String, required: true },
  vehicleType: { type: String, required: true },
  color: { type: String },
  location: { type: String, required: true },
  // rentalCompanyName: { type: String, required: false },
  images: { type: [String], required: true },
  price: { type: Number, required: true },

  features: { type: [String], required: true },
  rating: { type: Number, min: 0, max: 5 },
  noOfReviews: { type: Number },
  vehicleOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: { type: String, required: true },
  additionalServices: { type: [String], required: false },
  feedbacks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Feedback",
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
const validateVehicle = (vehicle) => {
  const schema = {
    vehicleModel: Joi.string().required(),
    vehicleType: Joi.string().required(),
    location: Joi.string().required(),
    // rentalCompanyName: Joi.string().optional(),
    images: Joi.array().items(Joi.string()).required(),
    price: Joi.number().required(),

    features: Joi.array().items(Joi.string()).required(),
    rating: Joi.number().min(0).max(5).optional(),
    feedbacks: Joi.array().items(Joi.string()).optional(),
    noOfReviews: Joi.number(),
    vehicleOwner: Joi.string().required(), // Assuming _id of the owner is string type
    additionalServices: Joi.array().items(Joi.string()).optional(),
    description: Joi.string().required(),
  };

  return Joi.validate(vehicle, schema);
};

exports.Vehicle = Vehicle;
exports.ValidateVehicle = validateVehicle;
