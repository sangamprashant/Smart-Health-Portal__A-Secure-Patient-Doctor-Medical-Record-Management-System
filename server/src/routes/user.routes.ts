import express from "express";
import { getMe, updateProfile } from "../controllers/user.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.put("/profile", protect, updateProfile);
router.get("/me", protect, getMe);

export default router;