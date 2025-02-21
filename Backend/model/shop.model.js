import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  phoneNumber: { type: String, required: false } // ✅ Ensure this is present
});

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
