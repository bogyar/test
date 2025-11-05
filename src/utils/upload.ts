import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(__dirname, "../../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => cb(null, uploadDir),
    filename: (req: any, file: any, cb: any) => {
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + path.extname(file.originalname));
    },
});

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req: any, file: any, cb: any) => {
        const allowed = ["image/jpeg", "image/png", "application/pdf"];
        if (!allowed.includes(file.mimetype)) {
            // Don't throw an exception here. Instead, mark the request with
            // a validation error and reject the file so the API route can
            // respond with a proper HTTP error instead of crashing the app.
            req.fileValidationError = 'Invalid file type';
            return cb(null, false);
        }
        cb(null, true);
    },
});
