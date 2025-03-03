import mongoose, { Document, Schema, Types } from "mongoose";
import bcrypt from "bcryptjs";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  avatarUrl?: string;
  favorites: {
    songs: Types.ObjectId[];
    albums: Types.ObjectId[];
    playlists: Types.ObjectId[];
    artists: Types.ObjectId[];
  };
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    favorites: {
      songs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
      albums: [{ type: Schema.Types.ObjectId, ref: "Album" }],
      playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
      artists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);
export default User;
