import express from "express";

import { login, signup,signupMultipleUsers } from "../controller/user.controller.js";  // Import signup function

const router = express.Router();

router.post("/signup", signup);  // Fix: Add signup function
router.post("/signup-multiple", signupMultipleUsers);
router.post("/login",login);
export default router;
