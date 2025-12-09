import { Note } from "../models/note.js";

// 1. Контролер для створеня нотатки

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

 //2. Контролер для отримання всіх нотаток

export const getAllNotes = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    tag,
    search,
  } = req.query;

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
};
