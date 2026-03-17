import express from 'express';
import taskController from '../controllers/taskController.js';
import authenticate from '../middleware/auth.js';

const router = express.Router();

// Rutas para tareas
router.get('/tasks', authenticate, taskController.getTasks);
router.post('/tasks', authenticate, taskController.createTask);
router.put('/tasks/:id', authenticate, taskController.updateTask);
router.delete('/tasks/:id', authenticate, taskController.deleteTask);

export default router;
