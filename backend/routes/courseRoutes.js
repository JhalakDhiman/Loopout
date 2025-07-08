import Router from 'express';
import { addQuestion, addCourse, getAllCourses, getCourseDetails, getCourseProgress } from '../controllers/course.js';
import {auth} from '../middlewares/auth.js'

const router = Router();

router.post('/addCourse',addCourse);
router.get('/getAllCourses',getAllCourses);
router.post('/addQuestion',addQuestion);
router.get('/getCourseDetails/:courseId',getCourseDetails);
router.get('/getCourseProgress/:courseId',auth,getCourseProgress);

export default router;