import { Response } from "express";
import User from "../models/user.model";

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