import mongoose, { Document, Schema } from "mongoose";

export interface IContactMessage extends Document {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "closed";
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema: Schema<IContactMessage> = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "read", "closed"],
      default: "new",
    },
  },
  { timestamps: true },
);

const ContactMessage = mongoose.model<IContactMessage>(
  "ContactMessage",
  contactSchema,
);

export default ContactMessage;
