import express from "express";
import {
    getStation,
    getStations,
    createStation,
    updateStation,
    deleteStation,
    getStationConnections,
} from "../controllers/stations.js";

import { authRole } from "../middleware/auth.js";

const router = express.Router();

/*GET */
router.get("/", getStations); // ziskani seznamu vsech stanic
router.get("/:id", getStation); // ziskani detailu konkretni stanice
router.get("/:id/connections", getStationConnections);

/* POST */
router.post("/", authRole(["admin", "technician"]), createStation); // vytvoreni nove stanice

/* PUT */
router.put("/:id", authRole(["admin", "technician"]), updateStation); // aktualizace detailu silnice

/* DELETE */
router.delete("/:id", authRole(["admin", "technician"]), deleteStation); // odstraneni stanice

export default router;

// IMPORT MIDDELWARE JE TO ADMIN,TECHNICIAN?
