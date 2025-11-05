export interface IUserRequest {
  id?: string;
  name: string;
  email: string;
  role: string;
  password: string;
  status?:"Active" | "Inactive"| "Deleted";
}
export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  status:"Active" | "Inactive"| "Deleted";
}