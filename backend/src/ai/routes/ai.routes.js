import express from 'express';
import aiController from '../controllers/ai.controller.js';
import authMiddleware from '../../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/generate-outline/:id', authMiddleware, aiController.generateOutlineController);
router.post('/generate-chapter/:id', authMiddleware, aiController.generateChapterController);

export default router;
