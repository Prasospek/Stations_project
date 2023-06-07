import express from "express";

import {
    getTicket,
    getTickets,
    createTicket,
    updateTicket,
    deleteTicket,
} from "../controllers/tickets.js";

const router = express.Router();

/*GET */
router.get("/", getTickets); // Ziskani vsech jizdenek
router.get("/:id", getTicket); // Ziskani specifické jizdenky

/* POST */
router.post("/", createTicket); // Vytvoreni nove jizdenky

/* PUT */
router.put("/:id", updateTicket); // Upraveni detailu jizdenky

/* DELETE */
router.delete("/:id", deleteTicket); // zrušení jizdenky

export default router;

// IMPORT MIDDELWARE JE TO ADMIN,TECHNICIAN?
