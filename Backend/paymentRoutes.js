const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Create order route
router.post('/create-order', async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100, // Amount in paise (INR)
      currency: "INR",
      receipt: "receipt#1",
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
