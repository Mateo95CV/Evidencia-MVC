import express from 'express';
import { authController } from '../controllers/authController.js';

const router = express.Router();

// Registro e inicio de sesión
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;