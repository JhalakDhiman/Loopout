import { Router } from "express";
import { addPoints, addStreak, getAssignment, isAssignmentSubmitted, submitAssignment } from "../controllers/assignment.js";
import {auth} from '../middlewares/auth.js'

const router = Router();

router.get('/:subSectionId',auth,getAssignment);
router.post('/addPoints',auth,addPoints);
router.post('/submitAssignment',auth,submitAssignment);
router.post('/isAssignmentSubmitted',auth,isAssignmentSubmitted);
router.post('/addStreak',auth,addStreak);

export default router;