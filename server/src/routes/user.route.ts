import { Router } from "express";
import {
  signup,
  login,
  logout,
  refreshToken,
  createAdmin,
  getMe,
  // forgotPassword,
} from "@/controllers/user.controller";
import { protect } from "@/middlewares/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/create-admin", createAdmin);
router.post("/refresh-token", refreshToken);
router.post("/get-me", getMe);
// router.post("/forgot-password", forgotPassword);

router.post("/logout", protect, logout);

export default router;
