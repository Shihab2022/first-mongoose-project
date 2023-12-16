import express from 'express'
import { adminController } from './admin.controller'
import validateRequest from '../../middlewares/validateRequest'
import { adminValidation } from './admin.validation'
const route = express.Router()

route.post('/', validateRequest(adminValidation.adminValidationSchema), adminController.createAdmin)
route.get('/:adminId', adminController.getSingleAdmin)

export const adminRoutes = route