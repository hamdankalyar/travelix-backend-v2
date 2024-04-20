const mongoose = require("mongoose");
const Joi = require("joi");

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "targetType"
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  response: { // Add this field
    type: mongoose.Schema.Types.ObjectId,
    ref: "Response",
    default: null
  }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

const validateFeedback = (feedback) => {
  const schema = {
    user: Joi.string().required(),
    targetId: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required(),
    response: Joi.string().allow('').required()
    
  };

  return Joi.validate(feedback, schema);
};

exports.Feedback = Feedback;
exports.ValidateFeedback = validateFeedback;
