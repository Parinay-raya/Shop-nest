import mongoose from "mongoose";
const shopSchema =mongoose.shopSchema({
    name :String,
    price:Number,
    category:String,
    image:String,
    title:String
})

const shop =mongoose.model("shop0",shopSchema);
export default shop;    