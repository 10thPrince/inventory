import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sessionMiddleware } from './config/session.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import { authGuard } from './middleware/authGuard.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Inventory API is running.' });
});

app.use('/auth', authRoutes);
app.use('/products', authGuard, productRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});