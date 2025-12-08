import { Note } from "../models/note.js";

export const getAllNotes = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    tag,
    search,
  } = req.query;

  const filter = {};

  // фільтр по тегу
  if (tag) {
    filter.tag = tag;
  }

  // текстовий пошук
  if (search) {
    filter.$text = { $search: search };
  }

  const skip = (page - 1) * perPage;

  // рахуємо всі нотатки під фільтром
  const totalNotes = await Note.countDocuments(filter);

  // отримуємо сторінку результатів
  const notes = await Note.find(filter)
    .skip(skip)
    .limit(Number(perPage));

  const totalPages = Math.ceil(totalNotes / perPage);

  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages,
    notes,
  });
};
