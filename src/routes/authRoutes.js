import express from 'express';
import authController from '../controllers/authController.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

// Registro e inicio de sesión
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);

// Perfil de usuario
router.get('/profile', authenticate, authController.getProfile);
router.put('/profile', authenticate, authController.updateProfile);

export default router;