import { Request, Response } from "express";
import Appointment from "../models/appointment.model";
import { createNotification } from "./notification.controller";

const getSlotKey = (date: string, time: string) => {
  return `${date}_${time}`;
};

// 🔥 Book Appointment
export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { patientId, doctorId, date, time, reason } = req.body;

    if (!patientId || !doctorId || !date || !time) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const slotKey = `${date}_${time}`;

    const existing = await Appointment.findOne({
      patientId,
      doctorId,
      slotKey,
    });
    if (existing) {
      return res.status(400).json({
        message: "You already booked this slot",
      });
    }

    const count = await Appointment.countDocuments({
      doctorId,
      slotKey,
    });
    if (count >= 2) {
      return res.status(400).json({
        message: "This slot is fully booked",
      });
    }

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      date,
      time,
      slotKey,
      reason,
    });

    await createNotification(
      doctorId,
      "New Appointment",
      "You have a new appointment request",
      "appointment",
    );

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const appointments = await Appointment.find({
      $or: [{ patientId: userId }, { doctorId: userId }],
    })
      .populate("patientId", "fullName email")
      .populate("doctorId", "fullName email");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const generateSlots = () => {
  const slots = [];
  let start = 10 * 60; // 10:00 AM
  let end = 18 * 60; // 6:00 PM

  for (let i = start; i < end; i += 15) {
    const hour = Math.floor(i / 60);
    const min = i % 60;

    slots.push(
      `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`,
    );
  }

  return slots;
};

export const getSlotAvailability = async (req: Request, res: Response) => {
  const { doctorId, date } = req.query;

  const slots = generateSlots();

  const bookings = await Appointment.find({ doctorId, date });

  const slotMap: any = {};

  bookings.forEach((b) => {
    slotMap[b.time] = (slotMap[b.time] || 0) + 1;
  });

  const result = slots.map((time) => ({
    time,
    booked: slotMap[time] || 0,
    available: (slotMap[time] || 0) < 2,
  }));

  res.json(result);
};
