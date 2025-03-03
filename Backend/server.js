import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import shoproute from "./route/shop.route.js";
import userRoute from "./route/user.route.js";
import { subscriptionRoutes } from "./route/subscription.route.js"; // ✅ Import as named export

// import shop from "./model/shop.model.js"; // Shop model import karna mat bhoolna

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const MongoDBURI = process.env.MongoDBURI;

// ✅ Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Required for parsing form data

// ✅ Connect to MongoDB using async/await
async function connectDB() {
  try {
    await mongoose.connect(MongoDBURI);
    console.log("✅ Connected to MongoDB");

    // ✅ Run seed data insertion only after connection is established
    // await insertData();
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}

// // ✅ Function to insert data
// const insertData = async () => {
//   try {
//     await shop.deleteMany(); // Purana data delete karega
//     await shop.insertMany([
//       {
//         name: "T-Shirt",
//         category: "Clothing",
//         price: 499,
//         inStock: true,
//         description: "High-quality cotton t-shirt",
//         imageUrl: "https://via.placeholder.com/150",
//         phoneNumber: "9123456789"
//       },
//       {
//         name: "Smartphone",
//         category: "Electronics",
//         price: 14999,
//         inStock: false,
//         description: "Latest model with great features",
//         imageUrl: "https://via.placeholder.com/150",
//         phoneNumber: "9876543210" 
//       },
//     ]);
//     console.log("✅ Data inserted successfully!");
//   } catch (error) {
//     console.error("❌ Error inserting data:", error);
//   }
// };

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
