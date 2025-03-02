import mongoose, { Document } from "mongoose";
import slugify from "slugify";

export interface IArtist extends Document {
  realName: string;
  stageName: string;
  slug: string;
  biography: string;
  dateOfBirth: Date;
  avatarUrl: string;
  bannerUrl: string;
  socialLinks?: {
    facebookUrl?: string;
    youtubeUrl?: string;
    instagramUrl?: string;
  };
  followerCount: number;
}

const artistSchema = new mongoose.Schema<IArtist>(
  {
    realName: {
      type: String,
      required: [true, "Real name is required"],
      trim: true,
      maxlength: [30, "Real name cannot exceed 30 characters"],
    },
    stageName: {
      type: String,
      required: [true, "Stage name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    biography: {
      type: String,
      required: [true, "Biography is required"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    avatarUrl: {
      type: String,
      required: [true, "Avatar URL is required"],
      trim: true,
    },
    bannerUrl: {
      type: String,
      required: [true, "Banner URL is required"],
      trim: true,
    },
    socialLinks: {
      facebookUrl: { type: String, trim: true, default: "" },
      youtubeUrl: { type: String, trim: true, default: "" },
      instagramUrl: { type: String, trim: true, default: "" },
    },
    followerCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

artistSchema.pre<IArtist>("validate", function (next) {
  if (!this.slug || this.isModified("stageName")) {
    this.slug = slugify(this.stageName, { lower: true, strict: true });
  }
  next();
});

const Artist = mongoose.model<IArtist>("Artist", artistSchema);
export default Artist;
