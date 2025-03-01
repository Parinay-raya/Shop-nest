import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Subscriber from "../model/Subscriber.js"; // Import the model

dotenv.config();
const router = express.Router();

// ✅ Create transporter for sending emails
const transporter = nodemailer.createTransport({
    service: "gmail", // You can use other email providers
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS  // Your email password or app password
    }
});

// ✅ Subscription route
router.post("/subscribe", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: "Email is required" });
    }

    try {
        //  ✅ Check if email is already subscribed
        const existingSubscriber = await Subscriber.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({ error: "This email is already subscribed." });
        }
        // ✅ Save the email in MongoDB
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        // ✅ Define email HTML with responsive styles
        const emailHTML = `
        <div style="max-width: 600px; margin: auto; font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; border-radius: 8px; line-height: 1.6;">
            <div style="text-align: center;">
                <img src="https://res.cloudinary.com/dqznjnjv9/image/upload/v1740904793/Logo-img_p5jqtf.png" 
                     alt="ShopNest Logo" 
                     style="width: 150px; margin-bottom: 15px;">
                <h2 style="color: #333;">🎉 Welcome to ShopNest – Your Ultimate Shopping Destination! 🛍️</h2>
            </div>
    
            <p style="color: #555; font-size: 16px; text-align: justify;">
                We are absolutely thrilled to have you on board! You’ve just joined a growing family of smart shoppers who enjoy **the best deals, latest trends, and top-quality products** – all in one place. At **ShopNest**, we believe that shopping should be an experience, not just a transaction. That’s why we’re committed to bringing you **a seamless, enjoyable, and rewarding online shopping journey**.  
            </p>
    
            <h3 style="color: #007BFF; text-align: center;">🚀 What Makes ShopNest Special?</h3>
    
            <p style="color: #555; font-size: 16px; text-align: justify;">
                ShopNest is more than just an online store; it's a community of **style-conscious, tech-savvy, and budget-smart** individuals who love quality and convenience. Our platform is designed to make your shopping experience **faster, safer, and more exciting**. 
            </p>
    
            <h3 style="color: #333;">🌟 Why You'll Love Shopping with Us</h3>
    
            <ul style="color: #555; font-size: 16px;">
                <li><strong>🛍️ Endless Choices:</strong> Whether you're looking for **fashion, electronics, home essentials, beauty products, or accessories**, we’ve got it all. Our catalog is updated daily with fresh arrivals.</li>
                <li><strong>💰 Exclusive Discounts:</strong> As a subscriber, you get **early access** to flash sales, seasonal discounts, and special promotions. Keep an eye on your inbox – exciting offers are coming your way soon! </li>
                <li><strong>🚚 Fast & Reliable Shipping:</strong> We understand that waiting for your order can be frustrating. That’s why we ensure **quick and hassle-free deliveries**, with real-time tracking updates.</li>
                <li><strong>🔒 Secure Shopping:</strong> Your security is our top priority. ShopNest uses **secure payment gateways** and follows industry-standard safety measures to protect your transactions.</li>
                <li><strong>🔄 Easy Returns & Refunds:</strong> Not satisfied with your purchase? No worries! Our **hassle-free return policy** ensures that you can shop with confidence.</li>
                <li><strong>🤝 Dedicated Customer Support:</strong> Got questions? Our **24/7 support team** is always ready to assist you with any inquiries or concerns.</li>
            </ul>
    
            <h3 style="color: #007BFF; text-align: center;">🎁 Your Exclusive Subscriber Perks</h3>
    
            <p style="color: #555; font-size: 16px; text-align: justify;">
                By subscribing to ShopNest, you’ve unlocked **exclusive benefits** that regular visitors don’t have access to. Here’s what you can expect:
            </p>
    
            <ul style="color: #555; font-size: 16px;">
                <li>✔️ **Personalized shopping recommendations** based on your interests.</li>
                <li>✔️ **First look at new arrivals** before they go public.</li>
                <li>✔️ **Exclusive subscriber-only coupons** and limited-time discounts.</li>
                <li>✔️ **Early access to mega sales**, including Black Friday, Cyber Monday, and festive discounts.</li>
                <li>✔️ **Surprise giveaways** – because we love spoiling our loyal customers! 🎁</li>
            </ul>
    
            <h3 style="color: #333;">🛒 Getting Started: Shop Your Favorites Now</h3>
    
            <p style="color: #555; font-size: 16px; text-align: justify;">
                Now that you’re a part of the ShopNest community, why wait? Start exploring **trendy styles, must-have gadgets, and home essentials** that fit your needs and budget. Click the button below to dive into a world of amazing deals!
            </p>
    
            <div style="text-align: center; margin: 20px 0;">
                <a href="https://shopnestweb.netlify.app" 
                   style="display: inline-block; padding: 12px 24px; color: #fff; background: #007BFF; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
                    🛒 Explore ShopNest Now
                </a>
            </div>
    
            <h3 style="color: #007BFF; text-align: center;">📢 Stay Connected with Us!</h3>
    
            <p style="color: #555; font-size: 16px; text-align: justify;">
                Want to be the first to know about **new launches, trending products, and hot deals**? Follow us on social media and stay updated with the latest from ShopNest:
            </p>
    
            <div style="text-align: center;">
                <a href="https://www.facebook.com/shopnest" style="margin-right: 10px;"><img src="https://img.icons8.com/color/48/facebook.png" alt="Facebook"></a>
                <a href="https://www.instagram.com/shopnest" style="margin-right: 10px;"><img src="https://img.icons8.com/color/48/instagram-new.png" alt="Instagram"></a>
                <a href="https://twitter.com/shopnest"><img src="https://img.icons8.com/color/48/twitter-circled.png" alt="Twitter"></a>
            </div>
    
            <h3 style="color: #333;">📩 Need Assistance?</h3>
    
            <p style="color: #555; font-size: 16px; text-align: justify;">
                If you have any questions, concerns, or feedback, we’re always here to help. Feel free to **reach out to our support team anytime** at:
            </p>
    
            <p style="text-align: center; color: #007BFF; font-size: 16px; font-weight: bold;">
                📧 <a href="mailto:support@shopnest.com" style="color: #007BFF; text-decoration: none;">support@shopnest.com</a>  
            </p>
    
            <hr style="margin: 20px 0; border: 1px solid #ddd;">
    
            <p style="text-align: center; color: #777; font-size: 14px;">
                If you did not subscribe to our newsletter, you can safely ignore this email. You won’t receive further emails unless you confirm your subscription.
            </p>
    
            <p style="text-align: center; color: #777; font-size: 14px;">
                We’re excited to have you with us. **Happy Shopping!** 💙  
                <br><strong>- The ShopNest Team</strong>
            </p>
        </div>
    `;

        // ✅ Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Welcome to ShopNest!",
            html: emailHTML
        });

        console.log(`✅ Email sent to: ${email}`);
        res.status(200).json({ message: "Subscription successful! Email sent." });
    } catch (error) {
        console.error("❌ Subscription failed:", error);
        res.status(500).json({ error: "Subscription failed. Please try again later." });
    }
});

export { router as subscriptionRoutes }; // ✅ Named export
