const mongoose = require("mongoose");
const Joi = require("joi");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookedItem: {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour", // Reference path is determined by the value of the 'bookedItemType' field
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    tourDate: {
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
  travellersInfo: [
    {
      email: String,
      cnic: String,
      number: String,
    },
  ],

  paymentType: {
    type: String,
    required: true,
  },
  isStatus: {
    type: Boolean,
    default: false,
  },
  bookingAt: { type: Date, default: Date.now },
});

const validateBooking = (booking) => {
  const schema = {
    user: Joi.objectId().required(),
    bookedItem: Joi.object({
      item: Joi.objectId().required(),
      price: Joi.number().required(),
      numberOfPersons: Joi.number().integer().min(1).required(),
      tourDate: Joi.object({
        startDate: Joi.date().iso().required(),
        finishDate: Joi.date().iso().required(),
      }).required(),
    }).required(),
    bookedUserInfo: Joi.object({
      fullName: Joi.string().required(),
      cnic: Joi.string().required(),
      gender: Joi.string(),
    }).required(),
    travellersInfo: Joi.array()
      .items(
        Joi.object({
          email: Joi.string().email().required(),
          cnic: Joi.string().required(),
          number: Joi.string().required(),
        })
      )
      .required(),
    paymentType: Joi.string().required(),
    isStatus: Joi.boolean().default(false),
  };
  return Joi.validate(booking, schema);
};
const Booking = mongoose.model("Booking", bookingSchema);

exports.Booking = Booking;
exports.ValidateBooking = validateBooking;
