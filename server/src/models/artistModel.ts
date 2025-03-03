import mongoose, { Document, Types } from "mongoose";
import slugify from "slugify";

interface IArtist extends Document {
  name: string;
  slug: string;
  bio?: string;
  avatarUrl: string;
  social: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

const artistSchema = new mongoose.Schema<IArtist>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    avatarUrl: {
      type: String,
      required: [true, "Avatar URL is required"],
    },
    social: {
      facebook: String,
      youtube: String,
      instagram: String,
    },
  },
  {
    timestamps: true,
  }
);

artistSchema.pre<IArtist>("save", function (next) {
  if (!this.slug || this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Artist = mongoose.model<IArtist>("Artist", artistSchema);
export default Artist;
