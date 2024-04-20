const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Payment,ValidatePayment} =require("../models/payment");


router.get("/",async (req,res)=>{
    const payments=await Payment.find();
    res.status(200).send(payments);
})
router.get("/:id",async (req,res)=>{
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send("Invalid user Id!");
    }
    const payment=await Payment.findById(id);
    if(!payment) {
        return res.status(404).send('Payment not found');
    }
    res.status(200).send(payment);
})
router.post("/",async(req,res)=>{
    const {error} =ValidatePayment(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    console.log("No error occurred");
    try {
        const payment=new Payment({
            userId:req.body.userId,
            paymentType:req.body.paymentType,
            bookingId:req.body.bookingId,
            amount:req.body.amount,
            paymentDate:req.body.paymentDate,
            // Other payment details...
        })
        const result=await payment.save();
        res.status(200).send(result);
    
        
    } catch (error) {
        
        res.status(400).send(error.message);
    }


})

//Update payment

router.put("/:id",async(req,res)=>{
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send('Invalid Id!');
    }
    const payment=await Payment.findByIdAndUpdate(id, req.body, { new: true });
    if(!payment) {
        return res.status(404).send('Payment not found');
    }
    res.status(200).send(payment);
})

//Delete the Payment
router.delete('/:id',async(req,res)=>{
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).send('Invalid Id!');
    }
    const payment=await Payment.findByIdAndDelete(id);
    if(!payment) {
        return res.status(404).send('Payment not found');
    }
    res.status(200).send(payment);
})
module.exports=router;