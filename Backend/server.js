import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import shoproute from "./route/shop.route.js";
import userRoute from "./route/user.route.js";
import { subscriptionRoutes } from "./route/subscription.route.js"; // Ensure named export

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const MongoDBURI = process.env.MongoDBURI;

// ✅ Ensure MongoDBURI is present
if (!MongoDBURI) {
  console.error("❌ MongoDBURI is missing in .env file!");
  process.exit(1);
}

// ✅ Enable CORS (Keep only one instance)
app.use(cors({
  origin: "https://shopnestweb.netlify.app", // Allow only your frontend
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

// ✅ Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data


// ✅ Connect to MongoDB using async/await
async function connectDB() {
  try {
    await mongoose.connect(MongoDBURI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
}

// ✅ Call the database connection function
connectDB();

// ✅ Define routes
app.use("/shop", shoproute);
app.use("/user", userRoute);
app.use("/api", subscriptionRoutes); // Use subscription route

// ✅ Start Express server after MongoDB connection
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
