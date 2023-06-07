import express from "express";

const router = express.Router();

/*GET */
router.get("/", getIssues); // Ziskani vsech poruch
router.get("/:id", getIssue); // Ziskani specificke poruchy
/* POST */
router.post("/", createIssue); // Vytvoreni nove poruchy

/* PUT */
router.put("/:id", updateIssue); //  Aktualizace poruchy

/* DELETE */
router.delete("/:id", deleteIssue); // Smazání poruchy

export default router;

// IMPORT MIDDELWARE JE TO ADMIN,TECHNICIAN?
