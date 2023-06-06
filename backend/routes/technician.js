import express from "express";
import { getStations } from "../controllers/technician.js";

const router = express.Router();
// check for role, authtoken? ?

// TODO
// Technici mohou sledovat stav tratí a zadávat problémy a poruchy.

/* GET*/ 
router.get("/login", getStations);

export default router;
