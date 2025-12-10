import express from "express";
import cors from "cors";
import "dotenv/config";

// Локальні імпорти
import { connectMongoDB } from "./db/connectMongoDB.js";
import { logger } from "./middleware/logger.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";
import notesRoutes from "./routes/notesRoutes.js";

// Імпорт Celebrate
import { errors } from "celebrate";

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Підключення до БД
await connectMongoDB();

// 2. Глобальні middleware
app.use(logger);
app.use(cors());
app.use(express.json());

// 3. Реєстрація маршрутів (Без префікса!)
app.use(notesRoutes);

// 4. Celebrate помилки
app.use(errors());

// 5. 404
app.use(notFoundHandler);

// 6. Загальний error handler
app.use(errorHandler);

// 7. Старт сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
