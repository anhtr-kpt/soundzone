import express from "express";
import { body } from "express-validator";
import {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
  getCurrentUser,
} from "@/controllers/authController";
import { protect } from "@/middlewares/authMiddleware";

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  signUp
);

router.post("/signin", signIn);

router.get("/signout", signOut);

router.post("/forgotpassword", forgotPassword);

router.patch(
  "/resetpassword/:token",
  [
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  resetPassword
);

router.get("/me", protect, getCurrentUser);

export default router;
