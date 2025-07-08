import { Router } from "express";
import { login, sendOtp, signup } from "../controllers/auth.js";

const router = Router();

router.post('/login',login);
router.post('/signup',signup);
router.post('/sendOtp',sendOtp);

export default router;