import { Request, Response } from "express";
import Artist, { IArtist } from "@/models/artistModel";

export const createArtist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const artistData: IArtist = req.body;
    const artist = new Artist(artistData);
    await artist.save();
    res.status(201).json({
      success: true,
      message: "Artist created successfully",
      data: { artist },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during sign in",
    });
  }
};

export const getArtists = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const artists = await Artist.find();
    res.status(200).json({ success: true, data: { artists } });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during sign in",
    });
  }
};

export const getArtistBySlug = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { slug } = req.params;
    const artist = await Artist.findOne({ slug });

    if (!artist) {
      res.status(404).json({
        success: false,
        message: "Artist not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: { artist },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during get artist by slug",
    });
  }
};

export const updateArtist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!artist) {
      res.status(404).json({ success: false, message: "Artist not found" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Artist updated successfully",
      data: { artist },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during update artist",
    });
  }
};

export const deleteArtist = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);
    if (!artist) {
      res.status(404).json({ success: false, message: "Artist not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Artist deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred during delete artist",
    });
  }
};
