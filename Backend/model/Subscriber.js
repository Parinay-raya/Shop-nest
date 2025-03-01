import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate emails
        trim: true,
        lowercase: true,
    },
    subscribedAt: {
        type: Date,
        default: Date.now, // Automatically stores the subscription date
    },
});

const Subscriber = mongoose.model("Subscriber", subscriberSchema);
export default Subscriber;
