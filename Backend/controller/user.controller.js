import User from "../model/usermodel.js";
import bcryptjs from 'bcryptjs'; 
import jwt from 'jsonwebtoken';


export const signup = async (req, res) => {
    try {
        console.log("Received data:", req.body);
        const { fullname, email, phone, address, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving the user
        const hashPassword = await bcryptjs.hash(password, 10);

        const createdUser = new User({
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            password: hashPassword, // Store the hashed password
        });

        await createdUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Login function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Get data from request body

        if (!email || !password) {
            return res.status(400).json({ message: "Missing email or password" });
        }

        // Authenticate user
        const user = await User.findOne({ email }).lean(); // Use .lean() for better performance

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT token with a secure secret key
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || "default_secret", // Use env variable
            { expiresIn: "1h" }
        );

        console.log("✅ Login successful:", { fullname: user.fullname, email: user.email });

        return res.status(200).json({
            fullname: user.fullname,
            email: user.email,
            token: token
        });

    } catch (error) {
        console.error("❌ Login Failed:", error);
        return res.status(500).json({ message: "⚠️ Something went wrong. Please try again." });
    }
};