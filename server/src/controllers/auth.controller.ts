import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id: string, role: string) => {
  return jwt.sign({ id, role }, "SECRET_KEY", {
    expiresIn: "7d",
  });
};

// ✅ Register
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await User.create({
      fullName,
      email,
      password,
      role,
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id.toString(), user.role),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ✅ Login
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

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id.toString(), user.role),
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};