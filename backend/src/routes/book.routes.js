import express from 'express';
import bookController from '../controllers/book.controllers.js'
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post("/create",authMiddleware,bookController.createBook);
export default router;