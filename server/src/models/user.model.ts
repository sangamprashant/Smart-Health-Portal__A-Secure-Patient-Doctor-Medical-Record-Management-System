import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "patient" | "doctor" | "admin";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;

  // 🔥 New fields
  profile_image?: string;
  gender?: "male" | "female" | "other";
  dateOfBirth?: Date;
  age?: number;

  phone?: string;

  address?: {
    city?: string;
    state?: string;
    country?: string;
  };

  patientId?: string;

  notifications: boolean;

  comparePassword(password: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema(
  {
    fullName: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["patient", "doctor", "admin"],
      default: "patient",
    },

    profile_image: {
      type: String,
      default: "",
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    dateOfBirth: {
      type: Date,
    },

    age: {
      type: Number,
    },

    phone: {
      type: String,
    },

    address: {
      city: String,
      state: String,
      country: String,
    },

    patientId: {
      type: String,
      unique: true,
    },

    notifications: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", function (next) {
  if (!this.patientId) {
    const year = new Date().getFullYear();
    const random = Math.floor(100 + Math.random() * 900);
    this.patientId = `SHP-${year}-${random}`;
  }
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
