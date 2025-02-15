import mongoose from "mongoose";

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Artist name is required"],
      trim: true,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    bio: {
      type: String,
      required: [true, "Artist bio is required"],
      trim: true,
      maxLength: [1000, "Bio cannot exceed 1000 characters"],
    },
    dateOfBirth: {
      type: Date,
      validate: {
        validator: function (v) {
          return !v || v <= new Date();
        },
        message: "Date of birth cannot be in the future",
      },
    },
    avatarUrl: {
      type: String,
      required: [true, "Avatar URL is required"],
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Invalid avatar URL format",
      },
    },
    bannerUrl: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: "Invalid banner URL format",
      },
    },
    socialLinks: {
      facebook: String,
      instagram: String,
      youtube: String,
    },
    followerCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    verified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

artistSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export const Artist = mongoose.model("Artist", artistSchema);
