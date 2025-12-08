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

// GET /notes (пошук + пагінація)
router.get("/notes", getAllNotesSchema, getAllNotes);

// GET /notes/:noteId
router.get("/notes/:noteId", noteIdSchema, getNoteById);

// POST /notes
router.post("/notes", createNoteSchema, createNote);

// PATCH /notes/:noteId
router.patch("/notes/:noteId", updateNoteSchema, updateNote);

// DELETE /notes/:noteId
router.delete("/notes/:noteId", noteIdSchema, deleteNote);

export default router;
