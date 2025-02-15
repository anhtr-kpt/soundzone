const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Song title is required"],
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
      required: [true, "Song bio is required"],
      trim: true,
      maxLength: [500, "Bio cannot exceed 500 characters"],
    },
    duration: {
      type: Number,
      required: [true, "Song duration is required"],
    },
    audioUrl: {
      type: String,
      required: [true, "Audio URL is required"],
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Invalid audio URL format",
      },
    },
    thumbnailUrl: {
      type: String,
      required: [true, "Thumbnail URL is required"],
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v);
        },
        message: "Invalid thumbnail URL format",
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
    artists: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist",
        required: true,
        index: true,
      },
    ],
    genres: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
        index: true,
      },
    ],
    composers: [
      {
        type: String,
        required: true,
      },
    ],
    lyrics: {
      type: String,
      trim: true,
    },
    releaseDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    listenCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    favoriteCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

songSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});
