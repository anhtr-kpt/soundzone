import express from "express";
import { body } from "express-validator";
import { createAdminAccount } from "../controllers/authController";
import { protect, adminOnly } from "../middlewares/authMiddleware";

const router = express.Router();

router.post(
  "/create-account",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  // protect,
  // adminOnly,
  createAdminAccount
);

export default router;
