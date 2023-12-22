import catchAsync from "../../utils/catchAsync";

import httpStatus from 'http-status';
import sendResponse from "../../utils/sentResponce";
import { AuthService } from "./auth.service";
import config from "../../config";




const LoginUser = catchAsync(async (req, res) => {

    const result = await AuthService.LoginUser(req.body)

    const { refreshToken, accessToken, needsPasswordChange } = result

    //set refresh token in cookie
    res.cookie("refreshToken", refreshToken, {
        secure: config.NODE_ENV !== "development", /// here check if this is going on production then cookie value is not showing 
        httpOnly: true,
    })

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User login successfully !!!",
        data: {
            refreshToken, accessToken, needsPasswordChange
        }
    })
})

const changePassword = catchAsync(async (req, res) => {


    console.log(req.user, req.body)

    const { ...passwordData } = req.body
    const result = await AuthService.changePassword(req.user, passwordData)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Update password successfully !!!",
        data: result
    })
})

export const AuthControllers = {
    LoginUser,
    changePassword

}