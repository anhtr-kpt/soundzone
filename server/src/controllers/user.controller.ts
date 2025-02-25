import { Request, Response, NextFunction } from "express";
import { User, UserRole } from "@/models/user.model";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { TokenPayload } from "@/middlewares/auth.middleware";

const generateAccessToken = (user: any) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET as string,
    { expiresIn: "15m" }
  );
};

const generateRefreshToken = (user: any) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { firstName, lastName, email, password, avatarUrl } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      avatarUrl,
      role: UserRole.USER,
    });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      success: true,
      message: "Signed up successfully!",
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatarUrl: user.avatarUrl,
          role: user.role,
        },
        tokens: { accessToken, refreshToken },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    user.lastLogin = new Date();

    const accessToken = user.generateAuthToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();

    const userResponse = user.toObject();
    const {
      password: userPassword,
      refreshToken: userRefreshToken,
      ...filteredUserResponse
    } = userResponse;

    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      data: {
        user: {
          ...filteredUserResponse,
          lastLogin: user.lastLogin,
        },
        tokens: { accessToken, refreshToken },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ message: "Refresh token is required" });
      return;
    }

    let decoded: TokenPayload;

    try {
      decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as TokenPayload;
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired refresh token" });
      return;
    }

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      res.status(401).json({ message: "Invalid refresh token" });
      return;
    }

    const authToken = user.generateAuthToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = newRefreshToken;
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      tokens: {
        authToken,
        refreshToken: newRefreshToken,
      },
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

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

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userData = (req as any).user;
    if (!userData) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await User.findByIdAndUpdate(userData.id, { refreshToken: "" });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedResetToken;

    user.resetPasswordExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset token generated",
      data: { resetToken },
    });
  } catch (error) {
    next(error);
  }
};

export const createAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const adminExists = await User.findOne({ role: UserRole.ADMIN });
    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: "Admin account already exists",
      });
    }

    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: "Email, password, firstName and lastName are required",
      });
    }

    const admin = new User({
      email,
      password,
      firstName,
      lastName,
      role: UserRole.ADMIN,
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: "Admin account created successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Error creating admin account",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
