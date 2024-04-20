const mongoose = require('mongoose');
const Joi = require('joi');

const paymentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    paymentType:{
        type: String,
        default:"Stripe",
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    // Other payment details...
});



const validatePayment=(payment)=>{
    const schema = {
        userId: Joi.objectId().required(),
        bookingId: Joi.objectId().required(),
        amount: Joi.number().min(0).required(),
     
    };
    return Joi.validate(payment,schema);
}
const Payment = mongoose.model('Payment', paymentSchema);

exports.Payment = Payment;
exports.ValidatePayment=validatePayment;
