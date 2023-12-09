
export type TAdmin = {
    email: string,
    password: string,
    needsPasswordChange: boolean,
    role: 'admin',
    status: 'in-progress' | 'blocked',
    isDeleted: boolean
}