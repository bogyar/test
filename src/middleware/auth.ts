import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  console.log(req.headers.authorization);
  const decoded = verifyAccessToken(token);
  if (!decoded) return res.status(403).json({ error: "Invalid token" });

  (req as any).user = decoded;
  next();
};
