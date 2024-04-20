const mongoose = require("mongoose");
const Joi = require("joi");

const hotelSchema = new mongoose.Schema({
  hotelName: { type: String, required: true },
  location: { type: String, required: true },
  hotelChain: { type: String },
  images: {
    type: Array,
    validate: {
      validator: function (value) {
        return value && value.length > 0;
      },
      message: "Please upload atleast one image",
    },
  },
  price: { type: Number, required: true },
  maxGuestsAllowed: { type: Number },
  // roomType: { type: String },
  amenities: { type: Array },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  noOfReviews: { type: Number, default: 0 },
  hotelOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
  description: { type: String, required: true },
  policies: {
    type: Array,
    required: false,

  },
  additionalServices: {
    type: Array,
    required: false,
    validate: {
      validator: function (value) {
        return value && value.length > 0;
      },
      message: "Services must not be empty",
    },
  },
  feedbacks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Feedback",
  },
});

const Hotel = mongoose.model("Hotel", hotelSchema);

const validateHotel = (hotel) => {
  const schema = {
    hotelName: Joi.string().required(),
    location: Joi.string().required(),
    hotelChain: Joi.string().required(),
    images: Joi.array().items(Joi.string()).min(1).required(),
    price: Joi.number().required(),
    maxGuestsAllowed: Joi.number().optional(),
    // roomType: Joi.string().required(),
    amenities: Joi.array().items(Joi.string()).required(),
    rating: Joi.number(),
    noOfReviews: Joi.number(),
    hotelOwner: Joi.string().required(),
    longitude: Joi.number().optional(),
    latitude: Joi.number().optional(),
    feedbacks: Joi.array().optional(),
    policies: Joi.array().items(Joi.string()).min(1).optional(),
    additionalServices: Joi.array().items(Joi.string()).min(1).optional(),
    description: Joi.string().required(), // Added validation for description field
  };
  return Joi.validate(hotel, schema);
};

exports.Hotel = Hotel;
exports.ValidateHotel = validateHotel;
