import express from "express";
import { findPath } from "../controllers/trainLines.js";

const router = express.Router();

/* POST */
router.post("/", findPath); // vyhledání nejkratší trasy mezi dvěma stanicemi

export default router;

// IMPORT MIDDELWARE JE TO ADMIN,TECHNICIAN?
