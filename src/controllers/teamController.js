import { pool } from '../db/index.js';
import { teams } from '../models/teamModel.js';

const teamController = {
    getTeams: async (req, res) => {
        try {
            const result = await pool.query(teams.getTeams);
            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener equipos' });
        }
    },

    createTeam: async (req, res) => {
        try {
            const { name, created_by } = req.body;

            if (!name) {
                return res.status(400).json({ error: 'Nombre del equipo es requerido' });
            }

            const result = await pool.query(
                teams.postTeam, 
                [name, created_by]
            );

            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear equipo' });
        }
    },

    addMember: async (req, res) => {
        try {
            const { team_id } = req.params;
            const { user_id } = req.body;

            if (!team_id || !user_id) {
                console.log("dhsagjhdg",team_id, user_id);
                return res.status(400).json({ error: 'El ID del equipo y del usuario son requeridos' });
            }

            const result = await pool.query(
                teams.postTeamMember,
                [user_id, team_id]
            );

            res.status(201).json(result.rows[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al agregar miembro al equipo' });
        }
    },

    getTeamMembers: async (req, res) => {
        try {
            const { team_id } = req.params;

            const result = await pool.query(teams.getTeamMembers, [team_id]);

            res.json(result.rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener miembros del equipo' });
        }
    }
};

export default teamController;