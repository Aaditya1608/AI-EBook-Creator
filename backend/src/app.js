import express from 'express';
import { query } from './config/db.js';

const app = express();

app.use(express.json());

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