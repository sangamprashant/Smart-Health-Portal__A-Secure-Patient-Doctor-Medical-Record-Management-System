import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;

  title: string;
  message: string;

  type: "appointment" | "system" | "report" | "alert";

  isRead: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema: Schema<INotification> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["appointment", "system", "report", "alert"],
      default: "system",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema,
);

export default Notification;
