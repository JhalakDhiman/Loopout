import Router from 'express';
import { getLeaderboard } from '../controllers/leaderboard.js';

const router = Router();

router.get('/getLeaderboard',getLeaderboard);

export default router;