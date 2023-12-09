import express from 'express'
import { adminController } from './admin.controller'
const route = express.Router()

route.post('/', adminController.createAdmin)

export const adminRoutes = route