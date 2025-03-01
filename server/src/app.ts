import express, { Application } from "express";
import adminRoutes from "@/routes/adminRoutes";
import authRoutes from "@/routes/authRoutes";
import genreRoutes from "@/routes/genreRoutes";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorMiddleware";

dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/genres", genreRoutes);

app.use(errorHandler);

export default app;
