// src/middleware/auth.middleware.ts
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface TokenPayload extends JwtPayload {
  id?: string;
  role?: string;
}

export const protect: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;
    (req as any).user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
    return;
  }
};
