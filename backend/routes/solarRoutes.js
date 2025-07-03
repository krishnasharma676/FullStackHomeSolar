import express from "express";
import { calculateSolarData } from "../controllers/solarController.js";

const router = express.Router();

router.post("/trackSolarDevice", calculateSolarData);

export default router;
