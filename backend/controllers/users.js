import express from "express";


const router = express.Router();

/*GET */
router.get("/", getUsers); // Ziskani vsech Usera
router.get("/:id", getUser); // Ziskani specifické Usera


/* PUT */
router.put("/:id", updateUser); // Upraveni detailu Usera

/* DELETE */
router.delete("/:id", deleteTicket); // zrušení Usera

export default router;

// IMPORT MIDDELWARE JE TO ADMIN,TECHNICIAN?
