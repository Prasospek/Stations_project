import express from "express";

import {
    getUser,
    getUsers,
    getUsersTickets,
    updateUser,
    deleteUser,
} from "../controllers/users.js";

import { authRole } from "../middleware/auth.js";

const router = express.Router();

/*GET */
router.get("/", getUsers); // Ziskani vsech Usera
router.get("/:id", getUser); // Ziskani specifické Usera
router.get("/:id/tickets", getUsersTickets); // Ziskani vsech jizdenek Usera

/* PUT */
router.put("/:id", updateUser); // Upraveni detailu Usera

/* DELETE */
router.delete("/:id", authRole(["admin", "technician"]), deleteUser); // zrušení Usera

export default router;
