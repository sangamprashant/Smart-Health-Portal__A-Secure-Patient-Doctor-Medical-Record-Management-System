import mongoose, { Document, Schema } from "mongoose";

export interface IEmergencyAccess extends Document {
  patientId: mongoose.Types.ObjectId;

  qrCodeId: string; 
  emergencyNotes?: string;

  active: boolean;
  createdAt: Date;
}

const emergencySchema: Schema<IEmergencyAccess> = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    qrCodeId: {
      type: String,
      required: true,
      unique: true,
    },

    emergencyNotes: {
      type: String,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const EmergencyAccess = mongoose.model<IEmergencyAccess>(
  "EmergencyAccess",
  emergencySchema
);

export default EmergencyAccess;
