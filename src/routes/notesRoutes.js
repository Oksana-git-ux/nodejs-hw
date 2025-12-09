import { Router } from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from "../controllers/notesController.js";

import { celebrate } from "celebrate";

import {
  getAllNotesSchema,
  noteIdSchema,createNoteSchema,
  updateNoteSchema,
} from "../validations/notesValidation.js";

const router = Router();

// GET /api/notes (пошук + пагінація)

router.get("/", celebrate(getAllNotesSchema), getAllNotes);

// GET /api/notes/:noteId

router.get("/:noteId", celebrate(noteIdSchema), getNoteById);

// POST /api/notes

router.post("/", celebrate(createNoteSchema), createNote);

// PATCH /api/notes/:noteId

router.patch("/:noteId", celebrate(updateNoteSchema), updateNote);

// DELETE /api/notes/:noteId

router.delete("/:noteId", celebrate(noteIdSchema), deleteNote);

export default router;
