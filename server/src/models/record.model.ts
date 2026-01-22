import mongoose, { Document, Schema } from "mongoose";

export interface IMedicalRecord extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId?: mongoose.Types.ObjectId;

  title: string;
  description: string;

  fileUrl?: string;

  createdAt: Date;
}

const recordSchema: Schema<IMedicalRecord> = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    fileUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

const MedicalRecord = mongoose.model<IMedicalRecord>(
  "MedicalRecord",
  recordSchema,
);

export default MedicalRecord;
