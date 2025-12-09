import express from "express";
import cors from "cors";
import "dotenv/config";

//Локальні імпорти
import { connectMongoDB } from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import notesRoutes from "./routes/notesRoutes.js";

//Імпорт сторонніх бібліотек
import { errors } from "celebrate";

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Підключення до БД (Перед запуском сервера)
await connectMongoDB();

// 2. Глобальний middleware (Перед маршрутами)
//Логування має бути першим
app.use(logger);

//Cors та обробка тіла запиту
app.use(cors());
app.use(express.json()); //Перед маршрутами, що використовують req.body

// 3. Маршрути (routes)
// Застосування маршрутів з префіксом /api/notes
app.use('/api/notes', notesRoutes);

// 4. Обробники помилок
// Celebrate - після маршрутів
app.use(errors());

// 5. Обробник 404 (Якщо жоден маршрут не спрацював, має приймати лише 1-3 аргументи, щоб спрацював)
app.use(notFoundHandler);

// 6. Фінальгтй обробник 500 (Обробка всіх помилок, переданих через next(err) має приймати 4 аргументи (err, req, res, next)
app.use(errorHandler);

// 7. Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
