import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import connectDB from "./config/db";

const PORT:number = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

/* Start Server */
const startServer = async () => {
  await connectDB();

  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
  });
};

startServer();
