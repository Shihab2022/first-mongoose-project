import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { departmentValidation } from './department.validation';
import { DepartmentController } from './department.controller';




const router = express.Router()
router.post('/create-academic-department', validateRequest(departmentValidation.academicDepartmentValidation), DepartmentController.createAcademicDepartment)
router.get('/get-all-academic-department', DepartmentController.getAllAcademicDepartment)
router.get('/get-single-academic-department/:departmentId', DepartmentController.getSingleAcademicDepartment)
router.patch('/update-single-academic-department/:departmentId', DepartmentController.updateSingleAcademicDepartment)


export const AcademicDepartmentRoutes = router;