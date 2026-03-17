const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Registro e inicio de sesión
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);

// Perfil de usuario
router.get('/profile', authenticate, authController.getProfile);
router.put('/profile', authenticate, authController.updateProfile);


module.exports = router;