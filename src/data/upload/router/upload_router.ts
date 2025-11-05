import { Router } from "express";
import { authMiddleware } from "../../../middleware/auth";
import { upload } from "../../../utils/upload";
import { UploadController } from "../controller/upload_controller";

const uploadRouter = Router();

uploadRouter.post("/single", authMiddleware, upload.single("file"), UploadController.uploadSingleFile);
uploadRouter.post("/multiple", authMiddleware, upload.array("files"), UploadController.uploadMultipleFiles);

export default uploadRouter;