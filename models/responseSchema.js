const mongoose = require("mongoose");
const Joi = require("joi");

const responseSchema = new mongoose.Schema({
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedback",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
 
});

const Response = mongoose.model("Response", responseSchema);

const validateResponse = (response) => {
    const schema = {
        review: Joi.string().required(),
        owner: Joi.string().required(),
        comment: Joi.string().required()
    };

    return Joi.validate(response, schema);
};

exports.Response = Response;
exports.ValidateResponse = validateResponse;
