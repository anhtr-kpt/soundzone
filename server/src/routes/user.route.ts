import express from "express";
import userController from "@/controllers/user.controller";

const router = express.Router();

router.route("/login").post(userController.login);
router.route("/register").post(userController.register);
router.route("/logout").post(userController.logout);
router.route("/create-admin-account").post(userController.createAdmin);

export default router;
