import mongoose from "mongoose";
const userSchema =mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true

    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
         required:true
    },
    password:{
        type:String,
        required:true
    }
});

const User=mongoose.model("User",userSchema);
export default User;