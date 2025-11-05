import express from "express";
import dotenv from "dotenv";
// import userRoutes from "./routes/userRoutes";
import { getMysqlPool, pool } from "./config/db";
import userRouter from "./data/user/routes/user_router";
import uploadRouter from "./data/upload/router/upload_router";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);


// Check DB connection
const initDatabase = async () => {
  try {
    await pool?.connect();
    console.log("✅ Database connected successfully");
  } catch (error: any) {
    console.log("⚠️ Starting server without DB connection...");
  }
  getMysqlPool();
};
initDatabase();

export default app;
