import catchAsync from "../../utils/catchAsync";

import httpStatus from 'http-status';
import sendResponse from "../../utils/sentResponce";
import { AuthService } from "./auth.service";




const LoginUser = catchAsync(async (req, res) => {

    const result = await AuthService.LoginUser(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User login successfully !!!",
        data: result
    })
})

export const AuthControllers = {
    LoginUser,

}