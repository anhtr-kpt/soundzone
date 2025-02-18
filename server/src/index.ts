import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import userRoute from "@/routes/user.route";
import cors from "cors";

dotenv.config();
connectDB();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/users", userRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
