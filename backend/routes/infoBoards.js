import express from "express";
import {
    getInfoBoard,
    getInfoBoards,
    createInfoBoard,
    updateInfoBoard,
    deleteInfoBoard,
} from "../controllers/infoBoards.js";


const router = express.Router();

/*GET */
router.get("/", getInfoBoards); //Ziskani vsech info tabuli
router.get("/:id", getInfoBoard); // Ziskani specifické info tabule

/* POST */
router.post("/", createInfoBoard); // Vytvoreni nove info tabule

/* PUT */
router.put("/:id", updateInfoBoard);

/* DELETE */
router.delete("/:id", deleteInfoBoard); // Smazani info tabule

export default router;
