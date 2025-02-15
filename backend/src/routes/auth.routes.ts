import express from 'express';
import { authController } from '../controllers/auth.controller';

const router = express.Router();

router.post('/google/callback', authController.googleCallback);

export const authRoutes = router; 