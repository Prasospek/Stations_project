import express from "express";

import {
    getTicket,
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    getCount,
} from "../controllers/tickets.js";

import { authRole } from "../middleware/auth.js";

const router = express.Router();

/*GET */
router.get("/", getTickets); // Ziskani vsech jizdenek
router.get("/count", getCount); // Ziskani vsech jizdenek

router.get("/:id", getTicket); // Ziskani specifické jizdenky
/* POST */
router.post("/", createTicket); // Vytvoreni nove jizdenky

/* PUT */
router.put("/:id", authRole(["admin", "technician"]), updateTicket); // Upraveni detailu jizdenky

/* DELETE */
router.delete("/:id", authRole(["admin", "technician"]), deleteTicket); // zrušení jizdenky

export default router;

// IMPORT MIDDELWARE JE TO ADMIN,TECHNICIAN?
