import express from 'express';
import { sendOTP, verifyOTP } from '../controllers/userController.js';

const router = express.Router();

router.post('/sendOTP', sendOTP);
router.post('/verifyOTP', verifyOTP);

export default router;