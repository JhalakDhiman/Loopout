import { Router } from "express";
import { getAllRating, rateCourse } from "../controllers/rating.js";
import {auth} from '../middlewares/auth.js'

const router = Router();

router.post('/rateCourse',auth,rateCourse);
router.get('/getAllRating',getAllRating);

export default router;