import { Request, Response } from "express";
import User, { UserRole } from "@/models/user.model";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

interface IRegisterUserInput {
  email: string;
  password: string;
  name: string;
}

interface ILoginInput {
  email: string;
  password: string;
}

class UserController {
  public async register(req: Request, res: Response): Promise<any> {
    try {
      const { email, password, name }: IRegisterUserInput = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      const user = new User({
        email,
        password,
        name,
        role: UserRole.USER,
      });

      await user.save();

      const authToken = user.generateAuthToken();
      const refreshToken = user.generateRefreshToken();

      user.refreshToken = refreshToken;
      await user.save();

      const userResponse = user.toObject();
      const {
        password: userPassword,
        refreshToken: userRefreshToken,
        ...filteredUserResponse
      } = userResponse;

      res.status(201).json({
        success: true,
        data: {
          user: filteredUserResponse,
          tokens: { authToken, refreshToken },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in registration",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  public async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password }: ILoginInput = req.body;

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      const authToken = user.generateAuthToken();
      const refreshToken = user.generateRefreshToken();

      user.refreshToken = refreshToken;
      user.lastLogin = new Date();
      await user.save();

      const userResponse = user.toObject();
      const {
        password: userPassword,
        refreshToken: userRefreshToken,
        ...filteredUserResponse
      } = userResponse;

      res.status(200).json({
        success: true,
        data: {
          user: filteredUserResponse,
          tokens: {
            authToken,
            refreshToken,
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in login",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  public async refreshToken(req: Request, res: Response): Promise<any> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: "Refresh token is required",
        });
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as { id: string };

      const user = await User.findOne({
        _id: new Types.ObjectId(decoded.id),
        refreshToken,
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid refresh token",
        });
      }

      const newAuthToken = user.generateAuthToken();
      const newRefreshToken = user.generateRefreshToken();

      user.refreshToken = newRefreshToken;
      await user.save();

      res.status(200).json({
        success: true,
        data: {
          tokens: {
            authToken: newAuthToken,
            refreshToken: newRefreshToken,
          },
        },
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid refresh token",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  public async logout(req: Request, res: Response): Promise<any> {
    try {
      const userId = (req as any).user.id;

      await User.findByIdAndUpdate(userId, {
        $unset: { refreshToken: 1 },
      });

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in logout",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  public async createAdmin(req: Request, res: Response): Promise<any> {
    try {
      const adminExists = await User.findOne({ role: UserRole.ADMIN });
      if (adminExists) {
        return res.status(400).json({
          success: false,
          message: "Admin account already exists",
        });
      }

      const { email, password, name }: IRegisterUserInput = req.body;

      const admin = new User({
        email,
        password,
        name,
        role: UserRole.ADMIN,
      });

      await admin.save();

      res.status(201).json({
        success: true,
        message: "Admin account created successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating admin account",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export default new UserController();
