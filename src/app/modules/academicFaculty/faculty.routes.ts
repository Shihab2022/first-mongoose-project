import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidation } from './faculty.validation';
import { FacultyController } from './faculty.controller';



const router = express.Router()

router.post('/create-academic-faculty', validateRequest(facultyValidation.academicFacultyValidation), FacultyController.createAcademicFaculty)
router.get('/get-all-academic-faculty', FacultyController.getAllAcademicFaculty)
router.get('/get-single-academic-faculty/:facultyId', FacultyController.getSingleAcademicFaculty)
router.patch('/update-single-academic-faculty/:facultyId', FacultyController.updateSingleAcademicFaculty)
router.delete('/:facultyId', FacultyController.deleteAcademicFaculty)


export const AcademicFacultyRoutes = router;