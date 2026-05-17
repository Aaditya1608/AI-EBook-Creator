import express from 'express';
import authMiddleware from "../../middlewares/auth.middleware.js";
import aiController from '../controllers/ai.controller.js';

const router = express.Router();

router.post(
    '/generate-outline/:id',
    authMiddleware,
    aiController.generateOutlineController
);

router.post(
    '/generate-chapter/:id',
    authMiddleware,
    aiController.generateChapterController
);

export default router;
