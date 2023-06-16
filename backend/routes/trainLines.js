import express from "express";
import { findPath } from "../controllers/trainLines.js";
import {
    createTrainLine,
    getTrainLine,
    getTrainLines,
    updateTrainLine,
    deleteTrainLine,
} from "../controllers/trainLines.js";

const router = express.Router();

/* POST */
router.post("/", findPath); // vyhledání nejkratší trasy mezi dvěma stanicemi
router.post("", createTrainLine);

/* GET */
router.get("/:id", getTrainLine);
router.get("/", getTrainLines);

/* PUT */
router.put("/:id", updateTrainLine);

/* DELETE */
router.delete("/:id", deleteTrainLine);

export default router;

// IMPORT MIDDELWARE JE TO ADMIN,TECHNICIAN?
