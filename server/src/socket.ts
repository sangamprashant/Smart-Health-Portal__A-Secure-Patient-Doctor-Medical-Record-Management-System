import { Server } from "socket.io";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "SECRET_KEY";

let io: Server | null = null;
const userSockets = new Map<string, Set<string>>();

const addUserSocket = (userId: string, socketId: string) => {
  const sockets = userSockets.get(userId) || new Set<string>();
  sockets.add(socketId);
  userSockets.set(userId, sockets);
};

const removeUserSocket = (userId: string, socketId: string) => {
  const sockets = userSockets.get(userId);
  if (!sockets) return;

  sockets.delete(socketId);
  if (!sockets.size) userSockets.delete(userId);
};

export const initSocket = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Unauthorized"));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: string;
        role: string;
      };
      socket.data.user = decoded;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.data.user?.id;

    if (userId) {
      addUserSocket(userId, socket.id);
      socket.join(`user:${userId}`);
    }

    socket.on("disconnect", () => {
      if (userId) removeUserSocket(userId, socket.id);
    });
  });

  return io;
};

export const emitToUser = (userId: string, event: string, payload: unknown) => {
  io?.to(`user:${userId}`).emit(event, payload);
};
