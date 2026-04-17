import mongoose, { Schema, Document } from "mongoose";

export interface IMedicalRecord extends Document {
  userId: mongoose.Types.ObjectId;
  doctorId?: mongoose.Types.ObjectId;

  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];

  dietPlan: {
    morning?: string;
    afternoon?: string;
    evening?: string;
    notes?: string;
  };

  doctorNotes: string;

  // 🔥 NEW IMPORTANT FIELDS
  allergies: string[];
  diseases: string[]; // e.g. diabetes, BP
  bloodGroup?: string;

  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };

  reports: {
    fileUrl: string;
    type: string; // X-ray, Blood Test, etc.
    date: Date;
  }[];

  isEmergencyAccessible: boolean; // for QR access

  createdAt: Date;
  updatedAt: Date;
}

const medicalRecordSchema: Schema<IMedicalRecord> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    medications: [
      {
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: { type: String, required: true },
        duration: { type: String, required: true },
      },
    ],

    dietPlan: {
      morning: String,
      afternoon: String,
      evening: String,
      notes: String,
    },

    doctorNotes: {
      type: String,
      required: true,
    },

    // 🔥 New fields
    allergies: [String],
    diseases: [String],

    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },

    emergencyContact: {
      name: String,
      phone: String,
      relation: String,
    },

    reports: [
      {
        fileUrl: String,
        type: String,
        date: { type: Date, default: Date.now },
      },
    ],

    isEmergencyAccessible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const MedicalRecord =
  mongoose.models.MedicalRecord ||
  mongoose.model<IMedicalRecord>("MedicalRecord", medicalRecordSchema);

export default MedicalRecord;