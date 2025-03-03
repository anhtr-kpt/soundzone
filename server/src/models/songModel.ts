import mongoose, { Schema, Document, Types } from "mongoose";
import slugify from "slugify";

interface ISong extends Document {
  title: string;
  bio?: string;
  slug: string;
  artists: Types.ObjectId[];
  composers: string[];
  audioUrl: string;
  duration: number;
  album?: Types.ObjectId;
  genres: Types.ObjectId[];
  coverUrl: string;
  releaseDate: Date;
  favoriteCount: number;
  playCount: number;
  lyrics?: string;
}

const songSchema = new Schema<ISong>(
  {
    title: {
      type: String,
      required: [true, "Song title is required"],
      trim: true,
      index: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    artists: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: [true, "Artist reference is required"],
      },
    ],
    composers: [
      {
        type: String,
        required: [true, "Composer is required"],
      },
    ],
    releaseDate: {
      type: Date,
      default: Date.now,
    },
    album: {
      type: Schema.Types.ObjectId,
      ref: "Album",
    },
    duration: {
      type: Number,
      required: [true, "Song duration is required"],
    },
    audioUrl: {
      type: String,
      required: [true, "Audio URL is required"],
    },
    coverUrl: {
      type: String,
      default: function (this: ISong) {
        return this.album ? "" : "default-song.jpg";
      },
    },
    lyrics: {
      type: String,
      trim: true,
    },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: [true, "Genre reference is required"],
      },
    ],
    playCount: {
      type: Number,
      default: 0,
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

songSchema.pre<ISong>("save", function (next) {
  if (!this.slug || this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Song = mongoose.model<ISong>("Song", songSchema);
export default Song;
