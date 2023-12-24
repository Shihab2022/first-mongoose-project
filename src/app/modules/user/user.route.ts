import express from 'express'
import { UserControllers } from './user.controller'

import { studentValidation } from '../student/student.validation'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.conostant'


const router = express.Router()
router.post('/create-user', auth(USER_ROLE.admin), validateRequest(studentValidation.createStudentValidationSchema), UserControllers.createStudent)
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student), UserControllers.getMe)


export const UserRoutes = router