import express from "express";
import {
    getStation,
    getStations,
    newStation,
    updateStation,
    deleteStation,
} from "../controllers/stations.js";

const router = express.Router();

/*GET */
router.get("/", getStations); // ziskani seznamu vsech stanic
router.get("/:id", getStation); // ziskani detailu konkretni stanice

/* POST */
router.post("/", newStation); // vytvoreni nove stanice

/* PUT */
router.put("/:id", updateStation); // aktualizace detailu silnice

/* DELETE */
router.delete("/:id", deleteStation); // odstraneni stanice

export default router;

// IMPORT MIDDELWARE JE TO ADMIN,TECHNICIAN?
