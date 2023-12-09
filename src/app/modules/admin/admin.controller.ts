import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sentResponce";
import { adminServices } from "./admin.service";

const createAdmin = catchAsync(async (req, res) => {
    const result = await adminServices.createAdminIntoDB(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "'Create admin successfully !!!",
        data: result
    })
})


export const adminController = {
    createAdmin
}