import express from 'express';
import bookController from '../controllers/book.controllers.js'
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post("/create",authMiddleware,bookController.createBook);
router.get("/",authMiddleware,bookController.getBooks);
router.patch("/:id",authMiddleware,bookController.updateEbook)
export default router;