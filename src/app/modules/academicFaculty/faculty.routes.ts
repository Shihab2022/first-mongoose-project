import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { facultyValidation } from './faculty.validation';
import { FacultyController } from './faculty.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.conostant';



const router = express.Router()

router.post('/create-academic-faculty', validateRequest(facultyValidation.academicFacultyValidation), FacultyController.createAcademicFaculty)
router.get('/get-all-academic-faculty', auth(USER_ROLE.admin, USER_ROLE.faculty), FacultyController.getAllAcademicFaculty)
router.get('/get-single-academic-faculty/:facultyId', FacultyController.getSingleAcademicFaculty)
router.patch('/update-single-academic-faculty/:facultyId', FacultyController.updateSingleAcademicFaculty)
router.delete('/:facultyId', FacultyController.deleteAcademicFaculty)


export const AcademicFacultyRoutes = router;