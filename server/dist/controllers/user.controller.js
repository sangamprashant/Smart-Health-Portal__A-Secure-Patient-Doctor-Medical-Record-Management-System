"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessibleProfile = exports.getPatients = exports.getDoctors = exports.getMe = exports.updateProfile = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const healthRecord_model_1 = __importDefault(require("../models/healthRecord.model"));
const record_model_1 = __importDefault(require("../models/record.model"));
const medicalRecord_model_1 = __importDefault(require("../models/medicalRecord.model"));
const appointment_model_1 = __importDefault(require("../models/appointment.model"));
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { fullName, gender, age, address } = req.body;
        if (age && age < 0) {
            return res.status(400).json({ message: "Invalid age" });
        }
        if (gender && !["male", "female", "other"].includes(gender)) {
            return res.status(400).json({ message: "Invalid gender" });
        }
        const updatedUser = await user_model_1.default.findByIdAndUpdate(userId, {
            fullName,
            gender,
            age,
            address,
        }, { new: true }).select("-password");
        res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.updateProfile = updateProfile;
const getMe = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await user_model_1.default.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getMe = getMe;
const getDoctors = async (_req, res) => {
    try {
        const doctors = await user_model_1.default.find({ role: "doctor" })
            .select("-password")
            .sort({ fullName: 1 });
        res.json(doctors);
    }
    catch {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getDoctors = getDoctors;
const getPatients = async (req, res) => {
    try {
        if (!["doctor", "admin"].includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }
        const patients = await user_model_1.default.find({ role: "patient" })
            .select("-password")
            .sort({ fullName: 1 });
        res.json(patients);
    }
    catch {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getPatients = getPatients;
const getAccessibleProfile = async (req, res) => {
    try {
        const viewer = req.user;
        const targetUser = await user_model_1.default.findById(req.params.id).select("-password");
        if (!targetUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const isSelf = viewer.id === targetUser.id;
        const isAdmin = viewer.role === "admin";
        const isDoctorViewingPatient = viewer.role === "doctor" && targetUser.role === "patient";
        if (!isSelf && !isAdmin && !isDoctorViewingPatient) {
            return res.status(403).json({ message: "Access denied" });
        }
        const healthRecord = targetUser.role === "patient"
            ? await healthRecord_model_1.default.findOne({ userId: targetUser._id }).lean()
            : null;
        const medicalRecord = targetUser.role === "patient"
            ? await medicalRecord_model_1.default.findOne({ userId: targetUser._id })
                .populate("doctorId", "fullName email")
                .lean()
            : null;
        const records = await record_model_1.default.find({ patientId: targetUser._id })
            .populate("doctorId", "fullName")
            .populate("issuedByDoctorId", "fullName email")
            .sort({ createdAt: -1 })
            .lean();
        const appointments = targetUser.role === "patient"
            ? await appointment_model_1.default.find({ patientId: targetUser._id })
                .populate("doctorId", "fullName email")
                .sort({ date: -1, createdAt: -1 })
                .lean()
            : [];
        res.json({
            user: targetUser,
            healthRecord,
            medicalRecord,
            records,
            appointments,
        });
    }
    catch {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getAccessibleProfile = getAccessibleProfile;
