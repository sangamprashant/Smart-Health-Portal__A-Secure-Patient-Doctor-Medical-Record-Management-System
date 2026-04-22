import { Response } from "express";
import User from "../models/user.model";
import HealthRecord from "../models/healthRecord.model";
import Record from "../models/record.model";
import MedicalRecord from "../models/medicalRecord.model";
import Appointment from "../models/appointment.model";

export const updateProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user?.id;

    const { fullName, gender, age, address } = req.body;

    if (age && age < 0) {
      return res.status(400).json({ message: "Invalid age" });
    }

    if (gender && !["male", "female", "other"].includes(gender)) {
      return res.status(400).json({ message: "Invalid gender" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        fullName,
        gender,
        age,
        address,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMe = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getDoctors = async (_req: any, res: Response) => {
  try {
    const doctors = await User.find({ role: "doctor" })
      .select("-password")
      .sort({ fullName: 1 });

    res.json(doctors);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getPatients = async (req: any, res: Response) => {
  try {
    if (!["doctor", "admin"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const patients = await User.find({ role: "patient" })
      .select("-password")
      .sort({ fullName: 1 });

    res.json(patients);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAccessibleProfile = async (req: any, res: Response) => {
  try {
    const viewer = req.user;
    const targetUser = await User.findById(req.params.id).select("-password");

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isSelf = viewer.id === targetUser.id;
    const isAdmin = viewer.role === "admin";
    const isDoctorViewingPatient =
      viewer.role === "doctor" && targetUser.role === "patient";

    if (!isSelf && !isAdmin && !isDoctorViewingPatient) {
      return res.status(403).json({ message: "Access denied" });
    }

    const healthRecord =
      targetUser.role === "patient"
        ? await HealthRecord.findOne({ userId: targetUser._id }).lean()
        : null;

    const medicalRecord =
      targetUser.role === "patient"
        ? await MedicalRecord.findOne({ userId: targetUser._id })
            .populate("doctorId", "fullName email")
            .lean()
        : null;

    const records = await Record.find({ patientId: targetUser._id })
      .populate("doctorId", "fullName")
      .populate("issuedByDoctorId", "fullName email")
      .sort({ createdAt: -1 })
      .lean();

    const appointments =
      targetUser.role === "patient"
        ? await Appointment.find({ patientId: targetUser._id })
            .populate("doctorId", "fullName email")
            .sort({ date: -1, createdAt: -1 })
            .lean()
        : [];

    res.json({
      user: targetUser,
      healthRecord,
      medicalRecord,
      records,
      appointments,
    });
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};
