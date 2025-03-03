import mongoose, { Document } from "mongoose";
import slugify from "slugify";

export interface IGenre extends Document {
  name: string;
  description: string;
  slug: string;
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
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

genreSchema.pre<IGenre>("validate", function (next) {
  if (!this.slug || this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

genreSchema.virtual("songCount", {
  ref: "Song",
  localField: "_id",
  foreignField: "genre",
  count: true,
});

const Genre = mongoose.model<IGenre>("Genre", genreSchema);
export default Genre;
