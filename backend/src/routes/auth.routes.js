import express from 'express';
import authController from "../controllers/auth.controllers.js"
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/signup',authController.signUp);
router.post('/login',authController.logIn);
router.get('/me',authMiddleware,(req,res)=>{
    res.json({
        user: req.user
    })
})
router.post("/logout",authMiddleware,(req,res)=>{
    res.clearCookie("token");
    res.json({
        message: "User logged out successfully!"
    })
})

export default router;