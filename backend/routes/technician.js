import express from "express";
import { getStations } from "../controllers/technician.js";

const router = express.Router();

router.get("/login", getStations);

export default router;
