import express from 'express';
import teamController from '../controllers/teamController.js';

const router = express.Router();

// Rutas para equipos
router.get('/teams', teamController.getTeams);
router.post('/teams', teamController.createTeam);
router.post('/teams/:team_id', teamController.addMember);
router.get('/teams/:team_id/members', teamController.getTeamMembers);

export default router;