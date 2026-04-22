"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const notification_controller_1 = require("./notification.controller");
const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";
const generateToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, JWT_SECRET, {
        expiresIn: "7d",
    });
};
const registerUser = async (req, res) => {
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
        const userExists = await user_model_1.default.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const allowedRoles = ["patient", "doctor"];
        const userRole = allowedRoles.includes(role) ? role : "patient";
        const user = await user_model_1.default.create({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        await (0, notification_controller_1.createNotification)(user._id.toString(), "Welcome", "You have successfully logged in", "system");
        res.status(200).json({
            message: "Login successful",
            token: generateToken(user._id.toString(), user.role),
            user,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};
exports.loginUser = loginUser;
