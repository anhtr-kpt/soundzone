import mongoose, { Document, Schema, Types } from "mongoose";

export interface IAlbum extends Document {
  title: string;
  slug: string;
  artist: Types.ObjectId;
  releaseDate: Date;
  coverUrl?: string;
  description?: string;
  duration: number;
  genres: Types.ObjectId[];
  songs: Types.ObjectId[];
  favoriteCount: number;
  playCount: number;
}

const albumSchema: Schema = new Schema<IAlbum>(
  {
    title: {
      type: String,
      required: [true, "Album title is required"],
      trim: true,
      index: true,
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: "Artist",
      required: [true, "Artist reference is required"],
    },
    releaseDate: {
      type: Date,
      default: Date.now,
    },
    coverUrl: {
      type: String,
      default: "",
    },
    genres: [
      {
        type: Schema.Types.ObjectId,
        ref: "Genre",
        required: [true, "Genre reference is required"],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Album = mongoose.model<IAlbum>("Album", albumSchema);
export default Album;
