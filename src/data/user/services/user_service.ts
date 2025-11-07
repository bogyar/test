import { IUserRequest, IUserResponse } from "../../../interfaces/IUser";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../../utils/jwt";
import { BaseUserRepositories } from "../repositories/base_user_repositories";

export class UserService {
    constructor(private userRepo: BaseUserRepositories) { }
    async registerUser(inputData: IUserRequest): Promise<IUserResponse|null> {
        const checkEmail = await this.userRepo.findUserByEmail(inputData.email);
        if (checkEmail) throw new Error("Email already exists");
        const hashed = await bcrypt.hash(inputData.password, 10);
        inputData.password = hashed;
        return await this.userRepo.createUser(inputData);
    }
    async loginUser(email: string, password: string): Promise<any> {
        const user = await this.userRepo.findUserByEmail(email);
        if (!user) throw new Error("User not found");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid password");
        const accessToken = generateAccessToken({ id: user.id, email: user.email, role: user.role });
        const refreshToken = generateRefreshToken({ id: user.id, email: user.email, role: user.role });
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        return { accessToken, refreshToken, expiresAt };
    }
    async getAllUsers(status?: string): Promise<IUserResponse[]> {
        return await this.userRepo.getAllUsers(status);
    }
    async getUserById(id: string): Promise<IUserResponse | null> {
        return await this.userRepo.findUserByID(id);
    }
    async updateUser(id: string, data: Partial<IUserRequest>): Promise<IUserResponse | null> {
        if (data.password) data.password = await bcrypt.hash(data.password, 10);
        const result= await this.userRepo.updateUser(id, data);
        if(!result) throw new Error("User not found");
        return result;
    }
    async updateUserStatus(id: string, status: string): Promise<IUserResponse | null> {
        return await this.userRepo.updateUserStatus(id, status);
    }
    async refreshToken(token: string) {
        // const stored = await this.tokenRepo.findToken(token);
        // if (!stored) throw new Error("Invalid refresh token");

        const decoded = verifyRefreshToken(token) as any;
        if (!decoded) throw new Error("Expired or invalid refresh token");

        const newAccessToken = generateAccessToken({
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        });

        return { accessToken: newAccessToken };
    }
}
