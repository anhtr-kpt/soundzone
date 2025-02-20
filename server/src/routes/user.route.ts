// src/routes/user.routes.ts
import { Router } from "express";
import {
  signup,
  login,
  checkAuth,
  logout,
  createAdmin,
  // forgotPassword,
} from "@/controllers/user.controller";
import { protect } from "@/middlewares/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/create-admin", createAdmin);
// router.post("/forgot-password", forgotPassword);

router.get("/me", protect, checkAuth);
router.post("/logout", protect, logout);

export default router;
