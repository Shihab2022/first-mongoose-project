import { Router } from "express";
import { studentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academic.route";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/faculty.routes";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/department.routes";
import { CoursesRoutes } from "../modules/course/course.routes";
import { adminRoutes } from "../modules/admin/admin.routes";
import { SemesterRegistrationRoute } from "../modules/semesterRegestation/semesterRegistration.routes";




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
        path: '/academic-faculty',
        endPoint: AcademicFacultyRoutes
    },
    {
        path: '/academic-department',
        endPoint: AcademicDepartmentRoutes
    },
    {
        path: '/courses',
        endPoint: CoursesRoutes
    },
    {
        path: '/admin',
        endPoint: adminRoutes
    },
    {
        path: '/semester-registration',
        endPoint: SemesterRegistrationRoute
    },
]


moduleRoutes.forEach(route => router.use(route.path, route.endPoint))
export const rootRouter = router