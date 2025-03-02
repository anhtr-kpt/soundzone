import express from "express";
import { protect } from "@/middlewares/authMiddleware";
import {
  createArtist,
  deleteArtist,
  getArtistBySlug,
  getArtists,
  updateArtist,
} from "@/controllers/artistController";

const router = express.Router();

router.get("/", getArtists);
router.get("/:slug", getArtistBySlug);

router.post("/", protect, createArtist);
router.put("/:id", protect, updateArtist);
router.delete("/:id", protect, deleteArtist);

export default router;
