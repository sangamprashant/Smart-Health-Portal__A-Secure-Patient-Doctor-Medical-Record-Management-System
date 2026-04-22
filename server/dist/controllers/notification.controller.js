"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsRead = exports.getNotifications = exports.createNotification = void 0;
const notification_model_1 = __importDefault(require("../models/notification.model"));
const socket_1 = require("../socket");
const createNotification = async (userId, title, message, type = "system") => {
    const notification = await notification_model_1.default.create({
        userId,
        title,
        message,
        type,
    });
    (0, socket_1.emitToUser)(userId, "notification:new", notification);
};
exports.createNotification = createNotification;
const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await notification_model_1.default.find({ userId }).sort({
            createdAt: -1,
        });
        res.json(notifications);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getNotifications = getNotifications;
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await notification_model_1.default.findOneAndUpdate({ _id: id, userId: req.user.id }, { isRead: true }, { new: true });
        res.json(notification);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.markAsRead = markAsRead;
