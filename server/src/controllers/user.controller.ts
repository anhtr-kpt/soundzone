import { Request, Response, NextFunction } from "express";
import { User, UserRole } from "@/models/userModel";

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userData = (req as any).user;
    if (!userData) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userData.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
