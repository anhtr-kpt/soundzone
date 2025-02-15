import mongoose from "mongoose";

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Genre name is required"],
      trim: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: [500, "Description cannot exceed 500 characters"],
    },
    iconUrl: {
      type: String,
      validate: {
        validator: function (v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: "Invalid icon URL format",
      },
    },
    color: {
      type: String,
      default: "#000000",
      validate: {
        validator: function (v) {
          return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v);
        },
        message: "Invalid color format",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

genreSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

genreSchema.virtual("songCount", {
  ref: "Song",
  localField: "_id",
  foreignField: "genres",
  count: true,
});

export const Genre = mongoose.model("Genre", genreSchema);
