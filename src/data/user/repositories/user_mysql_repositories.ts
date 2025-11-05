import {
    selectFirstQuery,
    selectManyQuery,
} from "../../../config/db";
import { IUserRequest, IUserResponse } from "../../../interfaces/IUser";
import { BaseUserRepositories } from "./base_user_repositories";

export class UserMysqlRepositories extends BaseUserRepositories {
    async createUser(inputData: IUserRequest): Promise<IUserResponse | null> {
        const insertUserQuery = `INSERT INTO users (id,name,email,password,role) VALUES (?,?,?,?,?)`;

        const values = [
            inputData.id,
            inputData.name,
            inputData.email,
            inputData.password,
            inputData.role,
        ];
        let result = await selectFirstQuery<IUserResponse | null>(
            insertUserQuery,
            values, "WRITE"
        );
        debugger;
        if (!result) {
            return null;
        }
        result = await selectFirstQuery<IUserResponse | null>(
            `SELECT id,name,email,role FROM users WHERE id = ? LIMIT 1`,
            [inputData.id]
        );
        return result;
    }

    async findUserByEmail(email: string): Promise<IUserRequest | null> {
        const findUserQuery = `SELECT * FROM users WHERE email = ? LIMIT 1`;
        const values = [email];
        const result = await selectFirstQuery<IUserRequest | null>(
            findUserQuery,
            values
        );
        return result;
    }
    async findUserByID(id: string): Promise<IUserResponse | null> {
        const findUserQuery = `SELECT id,name,email,role,status FROM users WHERE id = ? LIMIT 1`;
        const values = [id];
        const result = await selectFirstQuery<IUserResponse | null>(
            findUserQuery,
            values
        );
        return result;
    }
    async getAllUsers(status?: string): Promise<IUserResponse[]> {
        let whereQuery = "";
        const values = [];
        if (status) {
            whereQuery = `WHERE status = ?`;
            values.push(status);
        }
        const findUserQuery = `SELECT * FROM users ${whereQuery}`;
        const results = await selectManyQuery<IUserResponse>(
            findUserQuery,
            values
        );
        return results;
    }

    async updateUser(
        id: string,
        data: Partial<IUserRequest>
    ): Promise<IUserResponse | null> {
        const fields = [];
        const values: any[] = [];
        let index = 1;
        for (const [key, value] of Object.entries(data)) {
            fields.push(`${key} = ?`);
            values.push(value);
            index++;
        }
        values.push(id);
        const updateUserQuery = `UPDATE users SET ${fields.join(
            ", "
        )} WHERE id = ?`;
        let result = await selectFirstQuery<IUserResponse | null>(
            updateUserQuery,
            values
        );
        if(!result){
            return null;
        }
        result = await selectFirstQuery<IUserResponse | null>(
            `SELECT id,name,email,role FROM users WHERE id = ? LIMIT 1`,
            [id]
        );
        return result;
    }
    async updateUserStatus(
        id: string,
        status: string
    ): Promise<IUserResponse | null> {
        const updateStatusQuery = `UPDATE users set status = ? WHERE id = ?`;
        const values = [status, id];
        let result = await selectFirstQuery<IUserResponse | null>(
            updateStatusQuery,
            values
        );
        if(!result){
            return null;
        }
        result = await selectFirstQuery<IUserResponse | null>(
            `SELECT id,name,email,role FROM users WHERE id = ? LIMIT 1`,
            [id]
        );
        return result;
    }
}
