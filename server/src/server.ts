import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";

import https from "https";
import fs from "fs";

import path from "path";

const keyPath = path.join(__dirname, "../smarthealth.local-key.pem");
const certPath = path.join(__dirname, "../smarthealth.local.pem");

const PORT: number = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

const startServer = async () => {
  try {
    await connectDB();

    if (process.env.USE_HTTPS === "true") {
      const key = fs.readFileSync(keyPath);
      const cert = fs.readFileSync(certPath);

      https.createServer({ key, cert }, app).listen(PORT, HOST, () => {
        console.log(`HTTPS Server running at: https://localhost:${PORT}`);
      });
    } else {
      app.listen(PORT, HOST, () => {
        console.log(`HTTP Server running at: http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error("Server Failed to Start:", error);
    process.exit(1);
  }
};

startServer();
