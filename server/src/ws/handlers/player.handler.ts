import { Server, Socket } from "socket.io";

interface MovePayload {
  x: number;
  y: number;
  direction: string;
  userId: number;
}

export const playerSocketHandler = (io: Server, socket: Socket) => {
  socket.on("player:join", (userId: number) => {
    console.log(`Player ${userId} joined`);
    socket.broadcast.emit("player:joined", {
      userId: userId,
      socketId: socket.id,
    });
  });

  socket.on("player:move", (payload: MovePayload) => {
    socket.broadcast.emit("player:moved", {
      ...payload,
      socketId: socket.id,
    });
  });

  socket.on("player:action", (action: string) => {
    socket.broadcast.emit("player:acted", {
      action: action,
      socketId: socket.id,
    });
  });
};
