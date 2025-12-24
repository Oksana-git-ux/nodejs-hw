import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errors } from 'celebrate';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

await connectMongoDB();

app.use(logger);
app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use(notesRoutes);
app.use(authRoutes);
app.use(userRoutes);

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
