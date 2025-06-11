import { Server, Socket } from "socket.io";

export const registerRoomHandlers = (io: Server, socket: Socket) => {
  socket.on("join-room", ({ roomId, user }) => {
    socket.join(`room:${roomId}`);
    socket.to(`room:${roomId}`).emit("user-joined", user);
    console.log(`User ${user.username} joined room ${roomId}`);
  });

  socket.on("leave-room", ({ roomId, user }) => {
    socket.leave(`room:${roomId}`);
    socket.to(`room:${roomId}`).emit("user-left", user);
    console.log(`User ${user.username} left room ${roomId}`);
  });

  socket.on("move", ({ roomId, userId, x, y }) => {
    socket.to(`room:${roomId}`).emit("user-moved", { userId, x, y });
  });
};
