import { Request, Response } from "express";
import { IAuthRequest } from "../../../interfaces/IAuthRequest";

export class UploadController {
    static async uploadSingleFile(req: IAuthRequest, res: Response) {
        try {
            if (req.fileValidationError) {
                return res.status(400).json({ message: req.fileValidationError });
            }
            const userid = req.tokenUser?.id;
            const file = req.file;
            if (!file) return res.status(400).json({ message: "No file uploaded" });

            res.status(201).json({
                message: "File uploaded successfully",
                data: { file: file.filename },
            });
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
    static async uploadMultipleFiles(req: IAuthRequest, res: Response) {
        try {
            if (req.fileValidationError) {
                return res.status(400).json({ message: req.fileValidationError });
            }
            const userid = req.tokenUser?.id;
            const files = req.files as Express.Multer.File[];
            if (!files) return res.status(400).json({ message: "No files uploaded" });
            res.status(201).json({
                message: "Files uploaded successfully",
                data: files.map((file: any) => ({ file: file.filename })),
            });
        } catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

}