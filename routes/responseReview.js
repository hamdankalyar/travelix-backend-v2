const express = require('express');
const router = express.Router();
const { Response, ValidateResponse } = require('../models/responseSchema');
const { Feedback, ValidateFeedback } = require('../models/feedback');

// Get all responses
router.get('/', async (req, res) => {
    try {
        const responses = await Response.find();
        res.json(responses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get response by ID
router.get('/:id', getResponse, (req, res) => {
    res.json(res.response);
});

// Create new response
// Create new response
router.post('/', async (req, res) => {
    const response = new Response({
        review: req.body.review,
        owner: req.body.owner,
        comment: req.body.comment
    });

    try {
        // Save the new response
        const newResponse = await response.save();

        // Update the corresponding feedback document to include the response reference
        await Feedback.findByIdAndUpdate(req.body.review, {
            $set: { response: newResponse._id }
        });

        res.status(201).json(newResponse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get responses for a specific review
router.get('/review/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
    try {
        const responses = await Response.find({ review: reviewId }).populate('review');
        res.json(responses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Middleware to get response by ID
async function getResponse(req, res, next) {
    let response;
    try {
        response = await Response.findById(req.params.id);
        if (response == null) {
            return res.status(404).json({ message: 'Cannot find response' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.response = response;
    next();
}

module.exports = router;
