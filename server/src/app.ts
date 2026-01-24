import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

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

/* Routes */
app.get("/", (_req, res) => {
  res.send("Smart Health Portal API Running...");
});

app.use("/api/auth", authRoutes);

export default app;
