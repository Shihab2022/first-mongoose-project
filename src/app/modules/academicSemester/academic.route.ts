import express from 'express'
import { AcademicSemesterControllers } from './academic.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './academic.validation';



const router = express.Router()
router.post('/create-academic-semester', validateRequest(AcademicSemesterValidations.createAcademicValidationSchema), AcademicSemesterControllers.createAcademicSemester)
router.get('/get-all-academic-semester', AcademicSemesterControllers.getAllAcademicSemester)
router.get('/get-single-academic-semester/:id', AcademicSemesterControllers.getSingleAcademicSemester)


export const AcademicSemesterRoutes = router;