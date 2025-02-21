import User from "../model/usermodel.js";
import bcryptjs from "bcryptjs"
export const signup= async (req,res)=>{
    try {
        const{fullname,email,phonenumber,address,password}=req.body;
        const user=await User.findOne({email});
        if(user){
            return res.status(400).json({message:"USer already exists"});
        }   
        const hashPassword = await bcryptjs.hash(password,10)
        const createdUser=new User({
            fullname:fullname,
            email:email,
            phonenumber,
            address,
            password:hashPassword,
        });
       await createdUser.save();
        res.status(201).json({message:"User created successfully"});
    } catch (error) {
        console.log("Error",error.message);
        res.status(500).json({message:"Internal server error",error: error.message});

    }
}

// ✅ Function to register multiple users
export const signupMultipleUsers = async (req, res) => {
    try {
        const users = req.body;

        // Check if data is an array
        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ error: "Invalid data format. Expecting an array of users." });
        }

         // Insert multiple users, ignoring duplicates
         await User.insertMany(users, { ordered: false });

         res.status(201).json({ message: "Users inserted successfully (ignoring duplicates)!" });
 
     } catch (error) {
         if (error.code === 11000) {
             return res.status(400).json({ error: "Some users already exist. Duplicates skipped!" });
         }
         console.error("Error inserting multiple users:", error);
         res.status(500).json({ error: "Internal Server Error" });
     }
 };
 //login function
 export const login =async (req,res) =>{
    try {
        const {email,password }=req.body;
        const user =await User.findOne({email});
        const isMatch= await bcryptjs.compare(password,user.password);
        if(!User || !isMatch){
            return res.status(400).json({message:"Invalid username or password"});

        }else{
            res.status(200).json({message:"login successfull",user:{
                _id:user.id,
                fullname:user.fullname,
                email:user.email
            },
        });
        }
    } catch (error) {
        console.log("Error" + error.message);
        res.status(500).json({message:"Internal server error"});
        
    }
 }