import express from "express"
import validateRequest from "../../middlewares/validateRequest"
import { OfferedCourseControllers } from "./offeredCourse.controller"
import { OfferedCourseValidation } from "./offeredCourse.validation"

const router = express.Router()

router.post("/create-offered-course", validateRequest(OfferedCourseValidation.createOfferedCourseValidation), OfferedCourseControllers.createOfferedCourse)

router.get('/', OfferedCourseControllers.getAllOfferedCourse)
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse)
// router.delete('/:id', OfferedCourseControllers.deleteOfferCourse)

router.patch('/:id', validateRequest(OfferedCourseValidation.updateOfferedCourseValidation), OfferedCourseControllers.updateSingleOfferedCourse)


export const OfferedCourseRoute = router