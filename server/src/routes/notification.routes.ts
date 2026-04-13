import express from "express";
import {
  getNotifications,
  markAsRead,
} from "../controllers/notification.controller";

const router = express.Router();

router.get("/:userId", getNotifications);
router.put("/:id/read", markAsRead);

export default router;