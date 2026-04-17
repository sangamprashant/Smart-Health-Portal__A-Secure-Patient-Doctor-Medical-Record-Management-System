import { Response } from "express";
import Record from "../models/record.model";
import { createNotification } from "./notification.controller";

export const getRecords = async (req: any, res: Response) => {
  try {
    const filter =
      req.user.role === "patient"
        ? { patientId: req.user.id }
        : req.user.role === "doctor"
          ? { doctorId: req.user.id }
          : {};

    const records = await Record.find(filter)
      .populate("patientId", "fullName patientId")
      .populate("doctorId", "fullName")
      .sort({ createdAt: -1 });

    res.json(records);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};

export const createRecord = async (req: any, res: Response) => {
  try {
    const { patientId, title, description, fileUrl } = req.body;

    if (!patientId || !title) {
      return res.status(400).json({ message: "Patient and title required" });
    }

    const record = await Record.create({
      patientId,
      doctorId: req.user.role === "doctor" ? req.user.id : req.body.doctorId,
      title,
      description,
      fileUrl,
    });

    await createNotification(
      patientId,
      "New Report Uploaded",
      title,
      "report",
    );

    res.status(201).json(record);
  } catch {
    res.status(500).json({ message: "Server Error" });
  }
};
