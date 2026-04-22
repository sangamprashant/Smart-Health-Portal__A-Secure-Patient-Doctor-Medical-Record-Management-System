import mongoose, { Document, Schema } from "mongoose";

export interface IMedicalRecord extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId?: mongoose.Types.ObjectId;
  issuedByDoctorId?: mongoose.Types.ObjectId;

  title: string;
  description: string;
  recordType:
    | "lab-report"
    | "prescription"
    | "scan"
    | "discharge-summary"
    | "vaccination"
    | "referral"
    | "certificate"
    | "invoice"
    | "other";
  issuedDate?: Date;
  issuedByName?: string;

  fileUrl?: string;
  attachments: {
    name: string;
    url: string;
  }[];

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

    issuedByDoctorId: {
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

    recordType: {
      type: String,
      enum: [
        "lab-report",
        "prescription",
        "scan",
        "discharge-summary",
        "vaccination",
        "referral",
        "certificate",
        "invoice",
        "other",
      ],
      default: "other",
    },

    issuedDate: {
      type: Date,
    },

    issuedByName: {
      type: String,
      trim: true,
    },

    fileUrl: {
      type: String,
    },

    attachments: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

const MedicalRecord = mongoose.model<IMedicalRecord>(
  "MedicalRecordFile",
  recordSchema,
);

export default MedicalRecord;
