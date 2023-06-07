import express from "express";

const router = express.Router();

/*GET */
router.get("/");            //Ziskani vsech info tabuli
router.get("/:id");            // Ziskani specifické info tabule

/* POST */
router.post("/");            // Vytvoreni nove info tabule

/* PUT */
router.put("/:id");            // Aktualizace info tabule

/* DELETE */ 
router.delete("/:id");            // Smazani info Tabule

export default router;

// IMPORT MIDDELWARE JE TO ADMIN,TECHNICIAN?
