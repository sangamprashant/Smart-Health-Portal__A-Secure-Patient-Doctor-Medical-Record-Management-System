import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;

  date: Date;
  time: string;
  slotKey:string;

  reason: string;

  status: "pending" | "confirmed" | "completed" | "cancelled";

  createdAt: Date;
  updatedAt: Date;
}

const appointmentSchema: Schema<IAppointment> = new Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    slotKey: {
      type: String, // e.g. "2026-04-08_10:15"
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Appointment = mongoose.model<IAppointment>(
  "Appointment",
  appointmentSchema,
);

export default Appointment;
