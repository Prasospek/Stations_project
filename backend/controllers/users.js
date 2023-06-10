import express from "express";

const router = express.Router();

/*GET */
router.get("/", getUsers); // Ziskani vsech Usera
router.get("/:id", getUser); // Ziskani specifické Usera
router.get("/:id/tickets", getUsersTickets); // Ziskani vsech uzivatelovych Jizdenek

/* PUT */
router.put("/:id", updateUser); // Upraveni detailu Usera

/* DELETE */
router.delete("/:id", deleteUser); // zrušení Usera

export default router;

// IMPORT MIDDELWARE JE TO ADMIN,TECHNICIAN?
