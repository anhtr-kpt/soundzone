import mongoose, { Schema, Types } from "mongoose";

interface IPlaylist extends Document {
  title: string;
  slug: string;
  user: Types.ObjectId;
  description?: string;
  isPublic: boolean;
  coverUrl?: string;
  songs: Types.ObjectId[];
  genres: Types.ObjectId[];
  duration: number;
  playCount: number;
  favoriteCount: number;
}

const playlistSchema: Schema<IPlaylist> = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
  coverUrl: {
    type: String,
    default: "",
  },
  songs: [
    {
      type: Schema.Types.ObjectId,
      ref: "Song",
      required: true,
    },
  ],
  genres: [
    {
      type: Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
  ],
  duration: {
    type: Number,
    default: 0,
  },
  playCount: {
    type: Number,
    default: 0,
  },
  favoriteCount: {
    type: Number,
    default: 0,
  },
});

const Playlist = mongoose.model<IPlaylist>("Playlist", playlistSchema);
export default Playlist;
