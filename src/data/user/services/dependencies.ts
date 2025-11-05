import { UserMysqlRepositories } from "../repositories/user_mysql_repositories";
import { UserRepositories } from "../repositories/user_repositories";
import { UserService } from "./user_service";

const userRepository = new UserMysqlRepositories();

export const userService = new UserService(userRepository);