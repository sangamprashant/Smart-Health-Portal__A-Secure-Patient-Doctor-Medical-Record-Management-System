import dotenv from "dotenv";
dotenv.config();

import http from "http";
import os from "os";
import app from "./app";
import connectDB from "./config/db";
import { initSocket } from "./socket";

// import https from "https";
// import fs from "fs";

// import path from "path";
// import os from "os";

// const keyPath = path.join(__dirname, "../smarthealth.local-key.pem");
// const certPath = path.join(__dirname, "../smarthealth.local.pem");

const PORT: number = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

const getLocalIP = () => {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
};

const startServer = async () => {
  try {
    await connectDB();

    // if (process.env.USE_HTTPS === "true") {
    //   const key = fs.readFileSync(keyPath);
    //   const cert = fs.readFileSync(certPath);

    //   function getLocalIP() {
    //     const nets = os.networkInterfaces();
    //     for (const name of Object.keys(nets)) {
    //       for (const net of nets[name] || []) {
    //         if (net.family === "IPv4" && !net.internal) {
    //           return net.address;
    //         }
    //       }
    //     }
    //     return "localhost";
    //   }

    //   const ip = getLocalIP();
    //   console.log(`Mobile Portal: https://${ip}:${PORT}`);

    //   https.createServer({ key, cert }, app).listen(PORT, HOST, () => {
    //     console.log(`HTTPS Server running at: https://localhost:${PORT}`);
    //   });
    // } else {
    //   app.listen(PORT, HOST, () => {
    //     console.log(`HTTP Server running at: http://localhost:${PORT}`);
    //   });
    // }

    const httpServer = http.createServer(app);
    initSocket(httpServer);

    httpServer.listen(PORT, HOST, () => {
      console.log(`HTTP Server running at: http://localhost:${PORT}`);
      console.log(`Network Server running at: http://${getLocalIP()}:${PORT}`);
    });
  } catch (error) {
    console.error("Server Failed to Start:", error);
    process.exit(1);
  }
};

startServer();
