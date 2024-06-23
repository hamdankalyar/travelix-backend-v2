
const mongoose = require("mongoose");
const Joi = require("joi");
const { Feedback } = require("./feedback");
const tourSchema = new mongoose.Schema({
  place: {
    type: String,
    required: false,
    minlength: 1,
    maxlength: 277,
  },
  title: { type: String, required: true, minlength: 1, maxlength: 255 },
  tourOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    required: true,

  },

  images: {
    type: Array,
    validate: {
      validator: function (value) {
        return value && value.length > 0;
      },
      message: "Please upload atleast one image",
    },
  },
  duration: {
    type: Number,
    required: true,
  },
  personsAllowed: {
    type: Number,
    required: true,
  },
   noOfPersonsLeft: {
    type: Number,
    min: 0, // Optional: You can specify a minimum if it makes sense for your use case
  },
  amenities: {
    type: Array,
    required: true,
    validate: {
      validator: function (value) {
        return value && value.length > 0;
      },
      message: "Amenities must not be empty",
    },
  },

  availableDates: {
    type: [
      {
        startDate: {
          type: Date,
          required: true,
        },
        finishDate: {
          type: Date,
          required: true,
        },
      },
    ],
    required: true,
    validate: {
      validator: function (value) {
        return Array.isArray(value) && value.length > 0;
      },
      message: "Available dates array must not be empty",
    },
  },
  feedbacks: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Feedback",
  },
  price: {
    type: Number,
    min: 0,
    default: 0,
    required: true,
  },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  noOfReviews: { type: Number, default: 0 },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
});

const Tour = mongoose.model("Tour", tourSchema);

const validateTour = (tour) => {
  const schema = Joi.object({
    place: Joi.string().min(1).max(277).optional(),
    title: Joi.string().min(1).max(255).required(),
    tourOwner: Joi.objectId().required(),
    description: Joi.string().required(),
    images: Joi.array().items(Joi.string()).min(1).required(),
    duration: Joi.number().required(),
    personsAllowed: Joi.number().min(0).required(),
    amenities: Joi.array().items(Joi.string()).min(1).required(),
    availableDates: Joi.array().items(
      Joi.object({
        startDate: Joi.date().required(),
        finishDate: Joi.date().required(),
      })
    ).min(1).required(),
    price: Joi.number().min(0).required(),
    rating: Joi.number().min(0).max(5).optional(),
    noOfReviews: Joi.number().optional(), // Make sure to include this
    latitude: Joi.number().optional(),
    longitude: Joi.number().optional(),
    noOfPersonsLeft: Joi.number().min(0).optional(),
  });

  return schema.validate(tour);
};


exports.Tour = Tour;
exports.ValidateTour = validateTour;
