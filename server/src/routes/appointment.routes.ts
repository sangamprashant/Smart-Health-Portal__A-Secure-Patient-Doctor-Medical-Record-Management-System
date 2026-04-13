import express from "express";
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
} from "../controllers/appointment.controller";

const router = express.Router();

router.post("/", createAppointment);
router.get("/:userId", getAppointments);
router.put("/:id/status", updateAppointmentStatus);

export default router;