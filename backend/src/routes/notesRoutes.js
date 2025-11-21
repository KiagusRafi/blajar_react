import express from "express";
import { createNote, deleteNote, getAllNotes, updateNote, getNoteById } from "../controllers/notesController.js";

const router = express.Router();

// ini namanya endpoint
// endpoint adalah kombinasi URL dan HTTP method yang membolehkan user untuk berinteraksi dengan resource tertentu.
// HTTP method-nya dibuat jadi fungsi di file lain
router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id",updateNote);

router.delete("/:id", deleteNote);

export default router;