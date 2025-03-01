import express from "express";
import { body } from "express-validator";
import {
  createGenre,
  deleteGenre,
  getGenreById,
  getGenres,
  updateGenre,
} from "@/controllers/genreController";
import { protect } from "@/middlewares/authMiddleware";

const router = express.Router();

router.get("/", getGenres);
router.get("/:id", getGenreById);

router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").notEmpty().withMessage("Description is required"),
  ],
  protect,
  createGenre
);
router.put("/:id", protect, updateGenre);
router.delete("/:id", protect, deleteGenre);

export default router;
