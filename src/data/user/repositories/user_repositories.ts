import { excQueryReturnFirst, excQueryReturnMany } from "../../../config/db";
import { IUserRequest, IUserResponse } from "../../../interfaces/IUser";
import { BaseUserRepositories } from "./base_user_repositories";

export class UserRepositories extends BaseUserRepositories{
    async createUser(inputData:IUserRequest):Promise<IUserResponse>{
       const insertUserQuery = `INSERT INTO users (id,name,email,password,role) VALUES ($1,$2,$3,$4,$5) RETURNING id,name,email,role,status`;

       const values = [inputData.id,inputData.name,inputData.email,inputData.password,inputData.role];
       const result = await excQueryReturnFirst<IUserResponse>(insertUserQuery,values);
       return result;
    }

    async findUserByEmail(email:string):Promise<IUserRequest|null>{
        const findUserQuery = `SELECT * FROM users WHERE email = $1 LIMIT 1`;
        const values = [email];
        const result = await excQueryReturnFirst<IUserRequest|null>(findUserQuery,values);
        return result;
    }
    async findUserByID(id:string):Promise<IUserResponse|null>{
        const findUserQuery = `SELECT * FROM users WHERE id = $1 LIMIT 1`;
        const values = [id];
        const result = await excQueryReturnFirst<IUserResponse|null>(findUserQuery,values);
        return result;
    }
    async getAllUsers(status?:string):Promise<IUserResponse[]> {
        let whereQuery = '';
        const values = [];
        if(status){
            whereQuery = `WHERE status = $1`;
            values.push(status);
        }
        const findUserQuery = `SELECT * FROM users ${whereQuery}`;
        const results = await excQueryReturnMany<IUserResponse>(findUserQuery,values);
        return results;
    }

    async updateUser(id:string, data:Partial<IUserRequest>):Promise<IUserResponse|null>{
         const fields = [];
        const values: any[] = [];
        let index = 1;
        for(const [key,value] of Object.entries(data)){
            fields.push(`${key} = $${index}`);
            values.push(value);
            index++
        }
        values.push(id);
        const updateUserQuery = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING id,name,email,role,status`;
        const result = await excQueryReturnFirst<IUserResponse|null>(updateUserQuery,values);
        return result;
    }
    async updateUserStatus(id:string, status:string):Promise<IUserResponse|null>{
        const updateStatusQuery = `UPDATE users set status = $1 WHERE id = $2 RETURNING id,name,email,role,status`;
        const values = [status,id];
        const result = await excQueryReturnFirst<IUserResponse|null>(updateStatusQuery,values);
        return result;
    }



}