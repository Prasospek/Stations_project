import express from "express";
import {
    getInfoBoard,
    getInfoBoards,
    createInfoBoard,
    updateInfoBoard,
    deleteInfoBoard,
} from "../controllers/infoBoards.js";
import { authRole, verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*GET */
router.get("/", getInfoBoards); //Ziskani vsech info tabuli
router.get("/:id", getInfoBoard); // Ziskani specifické info tabule

/* POST */
router.post(
    "/",
    verifyToken,
    authRole(["admin", "technician"]),
    createInfoBoard
); // Vytvoreni nove info tabule

/* PUT */
router.put(
    "/:id",
    verifyToken,
    authRole(["admin", "technician"]),
    updateInfoBoard
); // Aktualizace info tabule

/* DELETE */
router.delete(
    "/:id",
    verifyToken,
    authRole(["admin", "technician"]),
    deleteInfoBoard
); // Smazani info tabule

export default router;


