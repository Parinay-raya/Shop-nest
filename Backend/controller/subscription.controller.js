require("dotenv").config();
const nodemailer = require("nodemailer");

const sendSubscriptionEmail = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

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

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Subscription successful! Check your email." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
    }
};

module.exports = { sendSubscriptionEmail };
