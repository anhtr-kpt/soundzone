import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Genre from "@/models/genreModel";

export const createGenre = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res
        .status(400)
        .json({ success: false, message: "Genre name is required" });
      return;
    }

    const existingGenre = await Genre.findOne({ name });

    if (existingGenre) {
      res.status(400).json({ success: false, message: "Genre already exists" });
    }

    const genre = new Genre({ name, description });
    await genre.save();

    res.status(201).json({
      success: true,
      message: "Genre created successfully",
      data: { genre },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during create genre",
    });
  }
};

export const getGenres = async (req: Request, res: Response): Promise<void> => {
  try {
    const genres = await Genre.find();
    res.status(200).json({ success: true, data: { genres } });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during get genres",
    });
  }
};

export const getGenreById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid genre id" });
      return;
    }

    const genre = await Genre.findById(id);
    if (!genre) {
      res.status(404).json({ success: false, message: "Genre not found" });
      return;
    }

    res.status(200).json({ success: true, data: { genre } });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during get genre by id",
    });
  }
};

export const updateGenre = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid genre id" });
      return;
    }

    const { name, description } = req.body;

    const updatedGenre = await Genre.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedGenre) {
      res.status(404).json({ success: false, message: "Genre not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Genre updated successfully",
      data: updatedGenre,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during update genre",
    });
  }
};

export const deleteGenre = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ success: false, message: "Invalid genre id" });
      return;
    }

    const deletedGenre = await Genre.findByIdAndDelete(id);
    if (!deletedGenre) {
      res.status(404).json({ success: false, message: "Genre not found" });
      return;
    }

    res
      .status(200)
      .json({ success: true, message: "Genre deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during delete genre",
    });
  }
};
