import express from "express";
import {
    createTrainLine,
    getTrainLine,
    getTrainLines,
    updateTrainLine,
    deleteTrainLine,
    findShortestPath,
} from "../controllers/trainLines.js";

import { authRole, verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* POST */

router.post("/", verifyToken, createTrainLine);

/* GET */
router.get("/:id", getTrainLine);
router.get("/", getTrainLines);

// Assuming you have already imported the necessary dependencies and models

router.get(
    "/shortest-path/:sourceStationId/:targetStationId",
    async (req, res) => {
        const sourceStationId = req.params.sourceStationId;
        const targetStationId = req.params.targetStationId;

        try {
            const shortestPath = await findShortestPath(
                sourceStationId,
                targetStationId
            );
            res.json({ shortestPath });
        } catch (error) {
            console.error("Error finding shortest path:", error);
            console.log(error);
            res.status(500).json({
                error: "An error occurred while finding the shortest path",
            });
        }
    }
);

/* PUT */
router.put(
    "/:id",
    verifyToken,
    authRole(["admin", "technician"]),
    updateTrainLine
);

/* DELETE */
router.delete(
    "/:id",
    verifyToken,
    authRole(["admin", "technician"]),
    deleteTrainLine
);

export default router;


