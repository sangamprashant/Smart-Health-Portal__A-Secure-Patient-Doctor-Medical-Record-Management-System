"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("https"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const http_1 = __importDefault(require("http"));
const os_1 = __importDefault(require("os"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
const socket_1 = require("./socket");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const keyPath = path_1.default.join(__dirname, "../10.77.96.177+3-key.pem");
const certPath = path_1.default.join(__dirname, "../10.77.96.177+3.pem");
const PORT = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";
const getLocalIP = () => {
    const nets = os_1.default.networkInterfaces();
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
        await (0, db_1.default)();
        let server;
        if (process.env.USE_HTTPS === "true") {
            const key = fs_1.default.readFileSync(keyPath);
            const cert = fs_1.default.readFileSync(certPath);
            const ip = getLocalIP();
            console.log(`Mobile Portal: https://${ip}:${PORT}`);
            server = https_1.default.createServer({ key, cert }, app_1.default);
            (0, socket_1.initSocket)(server);
            server.listen(PORT, HOST, () => {
                console.log(`HTTPS Server running at: https://localhost:${PORT}`);
            });
        }
        else {
            server = http_1.default.createServer(app_1.default);
            (0, socket_1.initSocket)(server);
            server.listen(PORT, HOST, () => {
                console.log(`HTTP Server running at: http://localhost:${PORT}`);
            });
        }
    }
    catch (error) {
        console.error("Server Failed to Start:", error);
        process.exit(1);
    }
};
startServer();
