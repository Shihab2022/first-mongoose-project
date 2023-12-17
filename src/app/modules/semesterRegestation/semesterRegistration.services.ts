import httpStatus from "http-status"
import AppError from "../../errors/AppError"
import { AcademicSemester } from "../academicSemester/academic.model"
import { TSemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model"
import QueryBuilder from "../../builder/QueryBuilder"
import { RegistrationStatus } from "./semesterRegistration.constant"

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {
    // check if there any registered semester that is already UPCOMING | ONGOING

    const isThereAnyUpComingOrOnGoingSemester = await SemesterRegistration.findOne({
        $or: [
            { status: RegistrationStatus.UPCOMING },
            { status: RegistrationStatus.ONGOING }
        ]
    })

    if (isThereAnyUpComingOrOnGoingSemester) {
        throw new AppError(httpStatus.BAD_REQUEST, `There is already an ${isThereAnyUpComingOrOnGoingSemester.status} registered semester `)
    }

    const academicSemesterId = payload.academicSemester
    // check if the semester is exit
    const isSemesterRegistrationExists = await SemesterRegistration.findOne({ academicSemesterId })
    if (isSemesterRegistrationExists) {
        throw new AppError(httpStatus.CONFLICT, "This semester is already registered ! ")
    }
    ///check if the Academic semester is exit 
    const isAcademicSemesterExit = await AcademicSemester.findById(academicSemesterId)
    if (!isAcademicSemesterExit) {
        throw new AppError(httpStatus.NOT_FOUND, "This academic semester is not found !")
    }

    const result = await SemesterRegistration.create(payload)

    return result

}
const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {

    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate("academicSemester"), query).filter().sort().paginate().fields();

    const result = await semesterRegistrationQuery.modelQuery

    return result
}
const getSingleSemesterRegistrationFromDB = async (id: string) => {

    const result = await SemesterRegistration.findById(id)
    return result

}
const updateSemesterRegistrationIntoDB = async (id: string, payload: Partial<TSemesterRegistration>) => {

    const isSemesterRegistrationExists = await SemesterRegistration.findById(id)
    if (!isSemesterRegistrationExists) {
        throw new AppError(httpStatus.CONFLICT, "Semester is not found ")
    }
    // if the request semester registration is ended , we will not update anything
    const currentSemesterStatus = isSemesterRegistrationExists.status
    const requestSemesterStatus = payload?.status

    if (currentSemesterStatus === RegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`)
    }


    // ----> UPCOMING --->  ONGOING  ---> ENDED
    // This process is not revert back
    if (currentSemesterStatus === RegistrationStatus.UPCOMING && requestSemesterStatus === RegistrationStatus.ENDED) {
        throw new AppError(httpStatus.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestSemesterStatus}`)
    }

    if (currentSemesterStatus === RegistrationStatus.ONGOING && requestSemesterStatus === RegistrationStatus.UPCOMING) {
        throw new AppError(httpStatus.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestSemesterStatus}`)
    }

    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return result
}


export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB
}