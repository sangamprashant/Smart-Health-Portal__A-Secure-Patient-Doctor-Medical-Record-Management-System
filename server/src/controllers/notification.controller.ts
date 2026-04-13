import { Request, Response } from "express";
import Notification from "../models/notification.model";

export const createNotification = async (
  userId: string,
  title: string,
  message: string,
  type: string = "system",
) => {
  await Notification.create({
    userId,
    title,
    message,
    type,
  });
};

export const getNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId }).sort({
      createdAt: -1,
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true },
    );

    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
