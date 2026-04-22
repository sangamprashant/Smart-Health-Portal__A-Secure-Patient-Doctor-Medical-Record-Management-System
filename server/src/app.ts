import express from "express";
import cors from "cors";
import path from "path";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.routes";
import settingsRoutes from "./routes/settings.routes";
import healthRoutes from "./routes/health.routes";
import emergencyRoutes from "./routes/emergency.routes";
import appointmentRoutes from "./routes/appointment.routes";
import notificationRoutes from "./routes/notification.routes";
import chatRoutes from "./routes/chat.routes";
import contactRoutes from "./routes/contact.routes";
import recordRoutes from "./routes/record.routes";

const app = express();

// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://127.0.0.1:5173",
// ];

app.use(
  // cors({
  //   origin: (origin, callback) => {
  //     if (!origin || allowedOrigins.includes(origin)) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error("Not allowed by CORS"));
  //     }
  //   },
  //   credentials: true,
  // })

  cors(), // allowing all.
);

/* Middleware */
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* Routes */
app.get("/", (_req, res) => {
  res.send("Smart Health Portal API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/records", recordRoutes);

export default app;
