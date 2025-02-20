import express from "express";
import {getshop} from "../controller/shop.controller.js";


const router =express.Router()

router.get("/",getshop);

export default router;