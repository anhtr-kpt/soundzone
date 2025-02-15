import Song from "../models/song.model";
import uploadToCloudinary from "../services/upload.service";

export const createSong = async (req, res) => {
  try {
    const { title, bio, artists, genres, composers, lyrics, releaseDate } =
      req.body;

    const audioResult = await uploadToCloudinary(
      req.files.audio[0].buffer,
      "songs/audio",
      "video"
    );

    const thumbnailResult = await uploadToCloudinary(
      req.files.thumbnail[0].buffer,
      "songs/thumbnails",
      "image"
    );

    let bannerUrl;
    if (req.files.banner) {
      const bannerResult = await uploadToCloudinary(
        req.files.banner[0].buffer,
        "songs/banners",
        "image"
      );
      bannerUrl = bannerResult.secure_url;
    }

    const song = await Song.create({
      title,
      bio,
      audioUrl: audioResult.secure_url,
      thumbnailUrl: thumbnailResult.secure_url,
      bannerUrl,
      artists: JSON.parse(artists),
      genres: JSON.parse(genres),
      composers: JSON.parse(composers),
      lyrics,
      releaseDate: releaseDate || Date.now(),
      duration: Math.round(audioResult.duration || 0),
    });

    res.status(201).json({
      success: true,
      data: song,
    });
  } catch (error) {
    console.error("Error creating song:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
