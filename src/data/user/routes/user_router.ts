import { Router } from "express";
import { UserController } from "../controller/user_controller";
import { authMiddleware } from "../../../middleware/auth";

const userRouter = Router();

userRouter.post("/register", UserController.registerUser);
userRouter.post("/login", UserController.loginUser);

userRouter.get("/", authMiddleware, UserController.getAllByStatus);
userRouter.get("/:id", authMiddleware, UserController.getUserById);
userRouter.put("/:id", authMiddleware, UserController.updateUser);
userRouter.patch("/:id", authMiddleware, UserController.updateUserStatus);
userRouter.post("/refresh-token", authMiddleware, UserController.refreshToken);

export default userRouter;
