import express from "express";
import {
  getDoctors,
  getMe,
  getPatients,
  updateProfile,
} from "../controllers/user.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.put("/profile", protect, updateProfile);
router.get("/me", protect, getMe);
router.get("/doctors", protect, getDoctors);
router.get("/patients", protect, getPatients);

export default router;
