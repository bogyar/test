import { Request } from "express";
import { IUserResponse } from "./IUser";

export interface IAuthRequest extends Request {
    tokenUser?: IUserResponse
}