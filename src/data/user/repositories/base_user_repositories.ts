import { IUserRequest, IUserResponse } from "../../../interfaces/IUser";

export abstract class BaseUserRepositories {
    abstract createUser(inputData: IUserRequest): Promise<IUserResponse|null>
    abstract findUserByEmail(email: string): Promise<IUserRequest|null>
    abstract findUserByID(id: string): Promise<IUserResponse|null>
    abstract getAllUsers(status?: string): Promise<IUserResponse[]>

    abstract updateUser(id: string, data: Partial<IUserRequest>): Promise<IUserResponse|null>
    abstract updateUserStatus(id: string, status: string): Promise<IUserResponse|null>
}
