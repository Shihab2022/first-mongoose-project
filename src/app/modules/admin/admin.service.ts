import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";
import { generatedAdminId } from "./admin.utils";

const createAdminIntoDB = async (payload: TAdmin) => {

    const id = await generatedAdminId()
    console.log('id', id)
    // const result = await Admin.create(payload)
    // return result
}
const getSingleAdminFromDB = async (id: string) => {
    const result = await Admin.findById(id)
    return result
}

export const adminServices = {
    createAdminIntoDB,
    getSingleAdminFromDB
}