const createStudent = async (req: Request, res: Response) => {
    try {

        const { student: studentData } = req.body
        ///validate data using joi 
        // const { error, value } = studentValidationSchema.validate(studentData)
        // const result = await studentServices.createStudentIntoDB(value) 
        // if (error) {
        //     res.status(500).json({
        //         success: false,
        //         message: 'Something going wrong ....',
        //         error: error?.details
        //     })
        // }
        const zodData = studentValidationSchemaWithZod.parse(studentData)
        const result = await studentServices.createStudentIntoDB(zodData)
        res.status(200).json({
            success: true,
            message: 'Student is created successfully !!!',
            data: result
        })
    }
    catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Something going wrong ....',
            error: error
        })
    }
}