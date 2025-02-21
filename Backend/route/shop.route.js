import express from "express";
import {getshop} from "../controller/shop.controller.js";


const router =express.Router();

router.post("/signup", (req, res) => {
    console.log("Signup API hit!");
    res.status(200).json({ message: "Signup route working!" });
});
export default router;