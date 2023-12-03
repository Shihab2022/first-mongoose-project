import { Router } from "express";
import { studentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academic.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/faculty.routes";



const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        endPoint: UserRoutes
    },
    {
        path: '/students',
        endPoint: studentRoutes
    },
    {
        path: '/academic-semesters',
        endPoint: AcademicSemesterRoutes
    },
    {
        path: '/academic-semesters',
        endPoint: AcademicFacultyRoutes
    },
]


moduleRoutes.forEach(route => router.use(route.path, route.endPoint))
export const rootRouter = router