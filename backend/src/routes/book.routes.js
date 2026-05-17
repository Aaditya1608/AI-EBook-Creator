import express from 'express';
import bookController from '../controllers/book.controllers.js'
import authMiddleware from '../middlewares/auth.middleware.js';
import upload from "../middlewares/upload.js";
const router = express.Router();


router.post("/create",authMiddleware,bookController.createBook);
router.post("/:id/upload",authMiddleware,upload.single("cover"),bookController.addCover);
router.get("/",authMiddleware,bookController.getBooks);
router.patch("/:id",authMiddleware,bookController.updateEbook);
router.delete("/:id",authMiddleware,bookController.deleteEbook);
export default router;