import mongoose, { Document } from "mongoose";

export interface IGenre extends Document {
  name: string;
  description: string;
}

const genreSchema = new mongoose.Schema<IGenre>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
      trim: true,
      maxlength: [30, "Name cannot exceed 30 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Genre = mongoose.model<IGenre>("Genre", genreSchema);
export default Genre;
