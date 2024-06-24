const mongoose = require("mongoose");
const Joi = require("joi");

const vehicleBookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookedItem: {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle", // Reference path is determined by the value of the 'bookedItemType' field
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    bookingDate: {
      startDate: {
        type: Date,
        required: true,
      },
      finishDate: {
        type: Date,
        required: true,
      },
    },
  },
  bookedUserInfo: {
    fullName: String,
    cnic: String,
    gender: String,
  },
  paymentType: {
    type: String,
    required: true,
  },
  isStatus: {
    type: Boolean,
    default: false,
  },
    isDelivered: { type: Boolean, default: false },
   feedbackGiven: { type: Boolean, default: false },
  bookingAt: { type: Date, default: Date.now },
});

const validateBooking = (booking) => {
  const schema = {
    user: Joi.objectId().required(),
    bookedItem: Joi.object({
      item: Joi.objectId().required(),
      price: Joi.number().required(),
      bookingDate: Joi.object({
        startDate: Joi.date().iso().required(),
        finishDate: Joi.date().iso().required(),
      }).required(),
    }).required(),
    bookedUserInfo: Joi.object({
      fullName: Joi.string().optional(),
      cnic: Joi.string().required(),
      gender: Joi.optional(),
    }).required(),
    paymentType: Joi.string().required(),
    isStatus: Joi.boolean().default(false),
  };
  return Joi.validate(booking, schema);
};

const VehicleBooking = mongoose.model("VehicleBooking", vehicleBookingSchema);

exports.VehicleBooking = VehicleBooking;
exports.ValidateBooking = validateBooking;
