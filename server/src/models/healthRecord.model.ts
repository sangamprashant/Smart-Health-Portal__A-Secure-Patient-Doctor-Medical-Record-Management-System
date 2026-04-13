import mongoose, { Schema, Document } from "mongoose";

export interface IHealthRecord extends Document {
  userId: mongoose.Types.ObjectId;
  weight: number;
  height: number;
  bmi: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const healthRecordSchema: Schema<IHealthRecord> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    weight: {
      type: Number,
      required: true,
      min: 1, 
    },

    height: {
      type: Number,
      required: true,
      min: 30, 
    },

    bmi: {
      type: Number,
    },

    bloodPressure: {
      systolic: {
        type: Number,
        required: true,
        min: 50,
      },
      diastolic: {
        type: Number,
        required: true,
        min: 30,
      },
    },
  },
  { timestamps: true },
);

const HealthRecord = mongoose.model<IHealthRecord>(
  "HealthRecord",
  healthRecordSchema,
);

export default HealthRecord;
