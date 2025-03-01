import express from "express";

import { login, signup } from "../controller/user.controller.js";  // Import signup function

const router = express.Router();

router.post("/signup", signup);  // Fix: Add signup function
router.post("/login",login);
export default router;
