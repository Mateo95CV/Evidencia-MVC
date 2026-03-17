import { pool } from '../db/index.js';
import { tasks } from '../models/taskModel.js';

const taskController = {
    getTasks: async (req, res) => {
        try {
            const teamId = req.params.id;
            const result = await pool.query(tasks.getTasks, [teamId]);
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener tareas' });
        }
    },

    createTask: async (req, res) => {
        try {
            const { title, description, status, assigned_to, team_id } = req.body;

            if (!title || !assigned_to || !team_id) {
                return res.status(400).json({ error: 'Título, asignado a y equipo son requeridos' });
            }

            const result = await pool.query(
                tasks.postTask,
                [
                    title,
                    description || '',
                    status || 'pending',
                    assigned_to,
                    team_id
                ]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear tarea' });
        }
    },

    updateTask: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, description, status, assigned_to, team_id } = req.body;

            const result = await pool.query(
                tasks.putTask,
                [
                    title,
                    description,
                    status,
                    assigned_to,
                    team_id,
                    id
                ]
            );

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }

            res.json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar tarea' });
        }
    },

    deleteTask: async (req, res) => {
        try {
            const { id } = req.params;

            const result = await pool.query(tasks.deleteTask, [id]);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Tarea no encontrada' });
            }

            res.json({ message: 'Tarea eliminada' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al eliminar tarea' });
        }
    }
};

export default taskController;
