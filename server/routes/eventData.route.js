import express from 'express';
import fetchuer from '../middlewares/fecthuser.js';
import { getLeaderboard, getParticipantByEmail, updateParticipantScore } from '../controllers/eventData.controller.js';

const eventDataRouter = express.Router();

// GET /api/v4/event-data/leaderboard
// Optional: ?semester=3rd or ?semester=5th
eventDataRouter.get('/leaderboard', getLeaderboard);
eventDataRouter.get('/participant', fetchuer, getParticipantByEmail);
eventDataRouter.put('/participant/:id/score', fetchuer, updateParticipantScore);

export default eventDataRouter;
