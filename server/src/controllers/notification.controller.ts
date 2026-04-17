import { Response } from "express";
import Notification from "../models/notification.model";
import { emitToUser } from "../socket";

export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  type: string = "system",
) => {
  const notification = await Notification.create({
    userId,
    title,
    message,
    type,
  });

  emitToUser(userId, "notification:new", notification);
};

export const getNotifications = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const markAsRead = async (req: any, res: Response) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { isRead: true },
      { new: true },
    );

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
