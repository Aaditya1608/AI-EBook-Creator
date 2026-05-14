import express from 'express';
import authController from "../controllers/auth.controllers.js"
const router = express.Router();

router.post('/signup',authController.signUp);
router.post('/login',authController.logIn);

export default router;