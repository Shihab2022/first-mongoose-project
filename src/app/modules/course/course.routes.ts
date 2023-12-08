import express from 'express'
import { CourseControllers } from './course.controller'
import { CourseValidation } from './course.validation'
import validateRequest from '../../middlewares/validateRequest'




const router = express.Router()
router.post('/create-courses', validateRequest(CourseValidation.createCourseValidationSchema), CourseControllers.createCourse)
router.patch('/:id', validateRequest(CourseValidation.updateCourseValidationSchema), CourseControllers.updateCourse)
router.get('/', CourseControllers.getAllCourses)
router.get('/:id', CourseControllers.getSingleCourse)
router.delete('/:id', CourseControllers.deleteCourse)
router.put("/:courseId/assign-faculties",
    validateRequest(CourseValidation.facultiesWithCourseValidationSchema),
    CourseControllers.assignFacultiesWithCourse)

router.delete("/:courseId/remove-faculties",
    validateRequest(CourseValidation.facultiesWithCourseValidationSchema), CourseControllers.removeFacultiesFromCourse)


export const CoursesRoutes = router;