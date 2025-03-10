require("dotenv").config();
const nodemailer = require("nodemailer");
const Subscription = require("../models/subscription.model"); // Import Subscription model

const sendSubscriptionEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Check if email already exists in the database
        const existingSubscription = await Subscription.findOne({ email });
        if (existingSubscription) {
            return res.status(409).json({ message: "You are already subscribed!" }); // Return conflict status
        }

        // Save the new subscription
        const newSubscription = new Subscription({ email });
        await newSubscription.save();

        // Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL, // Your email
                pass: process.env.PASSWORD // Your app password
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Subscription Confirmation - ShopNest",
            text: `Thank you for subscribing to ShopNest! Stay tuned for exciting updates and exclusive offers.`
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Subscription successful! Check your email." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error processing subscription" });
    }
};

module.exports = { sendSubscriptionEmail };
