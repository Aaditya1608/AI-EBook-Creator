import express from 'express';
import { query } from './config/db.js';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js';
import bookRoutes from './routes/book.routes.js';
import aiRoutes from './ai/routes/ai.routes.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/ebook",bookRoutes);
app.use("/api/ai",aiRoutes)
app.get('/test-db', async (req, res) => {
  try {
    const result = await query('SELECT NOW()');

    res.json({
      message: 'Connected to Neon!',
      time: result.rows[0],
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: 'Database connection error',
    });
  }
});

export default app;