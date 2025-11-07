import { Request, Response } from "express";
import { userService } from "../services/dependencies";
import { IUserRequest } from "../../../interfaces/IUser";
import { createUUID } from "../../../utils/helper";
import { IAuthRequest } from "../../../interfaces/IAuthRequest";

export class UserController {
    static async registerUser(req: Request, res: Response) {
        try {
            const { email, password, name, role } = req.body;
            if(!name) {
                return res.status(400).json({ message: "Name is required" });
            }
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }
            if(!role){
                return res.status(400).json({ message: "Role is required" });
            }
            const id = createUUID();
            const userInput:IUserRequest = { id, name, email, password, role };
            const user = await userService.registerUser(userInput);
            return res.status(201).json({
                message: "User registered successfully",
                data: user,
            });
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }
    static async loginUser(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email) {
                return res.status(400).json({ message: "Email is required" });
            }
            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }
            const user = await userService.loginUser(email, password);
            return res.status(200).json({
                message: "User logged in successfully",
                data: user,
            });
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }
    static async getAllByStatus(req:Request, res:Response){
        // const status = req.query.status as string || "Active";
        try {
            const users = await userService.getAllUsers(req.query.status as any);
            return res.status(200).json({ message: "Success", data: users });
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }
    static async updateUserStatus(req:Request, res:Response){
        try {
            const { id, status } = req.body;
            if(!id){
                return res.status(400).json({ message: "Id is required" });
            }
            if(!status){
                return res.status(400).json({ message: "Status is required" });
            }
            const user = await userService.updateUserStatus(id, status);
            return res.status(200).json({ message: "User status updated successfully", data: user });
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }
    static async refreshToken(req:Request, res:Response){
        try {
            const { token } = req.body;
            if(!token){
                return res.status(400).json({ message: "Token is required" });
            }
            const refreshToken = await userService.refreshToken(token);
            return res.status(200).json({ message: "Success", data: refreshToken });
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }
    static async updateUser(req:IAuthRequest, res:Response){
        try {
            const { id } = req.params;
            const { name, email, password, role } = req.body;
            if(!id){
                return res.status(400).json({ message: "Id is required" });
            }
            const userObj:any = {};
            if(name) userObj.name = name;
            if(email) userObj.email = email;
            if(password) userObj.password = password;
            if(role) userObj.role = role;
            const user = await userService.updateUser(id, userObj);
            return res.status(200).json({ message: "User updated successfully", data: user });
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }
    static async getUserById(req:Request, res:Response){
        try {
            const { id } = req.params;
            if(!id){
                return res.status(400).json({ message: "Id is required" });
            }
            const user = await userService.getUserById(id);
            return res.status(200).json({ message: "Success", data: user });
        } catch (error:any) {
            return res.status(500).json({ message: error.message });
        }
    }
    
}