import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserRole } from "@/models/user.model";

export const auth = (roles: UserRole[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");

      if (!token) {
        throw new Error();
      }

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as any;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Please authenticate",
      });
    }
  };
};
