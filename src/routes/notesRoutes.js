import { Router } from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/notesController.js";

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from "../validations/notesValidation.js";

const router = Router();

router.get("/", getAllNotesSchema, getAllNotes);

// GET /api/notes/:noteId
router.get("/:noteId", noteIdSchema, getNoteById);

// POST /api/notes
router.post("/", createNoteSchema, createNote);

// PATCH /api/notes/:noteId
router.patch("/:noteId", updateNoteSchema, updateNote);

// DELETE /api/notes/:noteId
router.delete("/:noteId", noteIdSchema, deleteNote);

export default router;
