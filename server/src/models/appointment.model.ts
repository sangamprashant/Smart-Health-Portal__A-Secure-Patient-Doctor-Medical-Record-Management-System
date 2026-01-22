import mongoose, { Document, Schema } from "mongoose";

export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;

  appointmentDate: Date;
  status: "pending" | "approved" | "completed" | "cancelled";

  createdAt: Date;
}

const appointmentSchema: Schema<IAppointment> = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    appointmentDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "completed", "cancelled"],
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
