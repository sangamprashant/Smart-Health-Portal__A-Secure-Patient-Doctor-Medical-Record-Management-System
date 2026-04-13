import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { createNotification } from "./notification.controller";

const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, "SECRET_KEY", {
    expiresIn: "7d",
  });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const allowedRoles = ["patient", "doctor"];
    const userRole = allowedRoles.includes(role) ? role : "patient";

    const user = await User.create({
      fullName,
      email,
      password,
      role: userRole,
    });

    const { password: _, ...userResponse } = user.toObject();

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id.toString(), user.role),
      user: userResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    await createNotification(
      user._id.toString(),
      "Welcome",
      "You have successfully logged in",
      "system",
    );

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id.toString(), user.role),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
