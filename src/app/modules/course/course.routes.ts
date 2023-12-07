import express from 'express'
import { CourseControllers } from './course.controller'
import { CourseValidation } from './course.validation'
import validateRequest from '../../middlewares/validateRequest'




const router = express.Router()
router.post('/create-courses', validateRequest(CourseValidation.createCourseValidationSchema), CourseControllers.createCourse)
router.get('/', CourseControllers.getAllCourses)
router.get('/:id', CourseControllers.getSingleCourse)
router.delete('/:id', CourseControllers.deleteCourse)


export const CoursesRoutes = router;