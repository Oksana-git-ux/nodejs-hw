import { Note } from "../models/note.js";
import createError from "http-errors";

// Контролер для отримання всіх нотаток
export const getAllNotes = async (req, res, next) => {
  try {
    const { page = 1, perPage = 10, tag, search } = req.query;

    const filter = {};

    if (tag) {
      filter.tag = tag;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * perPage;

    const totalNotes = await Note.countDocuments(filter);

    const notes = await Note.find(filter)
      .skip(skip)
      .limit(Number(perPage));

    const totalPages = Math.ceil(totalNotes / perPage);

    res.status(200).json({
      status: 200,
      page: Number(page),
      perPage: Number(perPage),
      totalNotes,
      totalPages,
      notes,
    });
  } catch (error) {
    next(error);
  }
};

// Контролер для створення нотатки
export const createNote = async (req, res, next) => {
  const { title, content, tag } = req.body;

  try {
    const newNote = await Note.create({
      title,
      content,
      tag,
    });

    res.status(201).json({
      status: 201,
      message: "Note successfully created",
      data: newNote,
    });
  } catch (error) {
    next(error);
  }
};

// Контролер для видалення нотатки (deleteNote)
export const deleteNote = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);

    if (!deletedNote) {
      return next(createError(404, `Note with id ${noteId} not found`));
    }

    // Вимога: повернути 200 і видалену нотатку
    res.status(200).json({
      status: 200,
      message: "Note successfully deleted",
      data: deletedNote,
    });
  } catch (error) {
    next(error);
  }
};

// Контролер для оновлення нотатки (updateNote)
export const updateNote = async (req, res, next) => {
  const { noteId } = req.params;
  const updates = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return next(createError(404, `Note with id ${noteId} not found`));
    }

    res.status(200).json({
      status: 200,
      message: "Note successfully updated",
      data: updatedNote,
    });
  } catch (error) {
    next(error);
  }
};

// Контролер для отримання нотатки за Id
export const getNoteById = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    const note = await Note.findById(noteId);

    if (!note) {
      return next(createError(404, `Note with id ${noteId} not found`));
    }

    res.status(200).json({
      status: 200,
      data: note,
    });
  } catch (error) {
    next(error);
  }
};
