import express from "express";

const router = express.Router();

/*GET */
router.get("/"); // Ziskani vsech jizdenek
router.get(":id"); // Ziskani specifické jizdenky

/* POST */
router.post("/"); // Vytvoreni nove jizdenky

/* PUT */
router.put("/:id"); // Upraveni detailu jizdenky

/* DELETE */
router.delete(":id"); // zrušení jizdenky

export default router;

// IMPORT MIDDELWARE JE TO ADMIN,TECHNICIAN?
