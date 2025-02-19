import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserRole } from "@/models/user.model";

interface TokenPayload extends JwtPayload {
  id?: string;
  role?: string;
}

export const auth = (roles: UserRole[] = []): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "Please authenticate",
      });
      return;
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as TokenPayload;

      if (
        roles.length &&
        (!decoded.role || !roles.includes(decoded.role as UserRole))
      ) {
        res.status(403).json({
          success: false,
          message: "Access denied",
        });
        return;
      }

      (req as any).user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Please authenticate",
      });
      return;
    }
  };
};
