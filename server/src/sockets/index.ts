import { Server } from "socket.io";
import { connectionHandler } from "./connectionHandler";

export const initSocketServer = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    connectionHandler(io, socket);
  });
};
