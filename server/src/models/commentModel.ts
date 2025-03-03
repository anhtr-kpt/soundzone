import mongoose, { Document, Schema } from "mongoose";

interface IComment extends Document {
  user: mongoose.Schema.Types.ObjectId;
  content: string;
  song?: mongoose.Schema.Types.ObjectId;
  album?: mongoose.Schema.Types.ObjectId;
}

const commentSchema: Schema<IComment> = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    song: { type: mongoose.Schema.Types.ObjectId, ref: "Song" },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
  },
  { timestamps: true }
);

export default mongoose.model<IComment>("Comment", commentSchema);
