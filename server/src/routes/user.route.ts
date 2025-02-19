import express from "express";
import userController from "@/controllers/user.controller";
import { auth } from "middlewares/auth";

const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/logout", auth(), userController.logout);
router.post("/create-admin-account", userController.createAdmin);
router.get("/me", auth(), userController.getCurrentUser);
// router.get("/admin-only", auth([UserRole.ADMIN]), (req, res) => {
//   res.status(200).json({ message: "Admin access granted" });
// });

export default router;
