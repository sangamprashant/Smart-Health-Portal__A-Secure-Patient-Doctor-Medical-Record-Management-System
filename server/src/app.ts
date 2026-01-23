import express from "express";
import cors from "cors";

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* Routes */
app.get("/", (_req, res) => {
  res.send("Smart Health Portal API Running...");
});

export default app;
