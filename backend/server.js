import app from './src/app.js';
import dotenv from 'dotenv';
import { initDB } from './src/initDB.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

await initDB();

app.listen(PORT, () => {
  console.log(`Backend running on Port ${PORT}`);
});