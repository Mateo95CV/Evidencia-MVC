import express from 'express';
import taskController from '../controllers/taskController.js';

const router = express.Router();

// Rutas para tareas
router.get('/tasks/:id', taskController.getTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:id', taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

export default router;
