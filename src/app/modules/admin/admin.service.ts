import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdminIntoDB = async (payload: TAdmin) => {
    const result = await Admin.create(payload)
    return result


}

export const adminServices = {
    createAdminIntoDB
}