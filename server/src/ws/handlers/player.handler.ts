import { Server, Socket } from "socket.io";
import { connectedPlayers } from "../cache/players";

interface MovePayload {
  x: number;
  y: number;
  direction: string;
  userId: number;
  roomId: string;
}

export const playerSocketHandler = (io: Server, socket: Socket) => {
  socket.on("player:move", (payload: MovePayload) => {
    const player = connectedPlayers.get(socket.id);
    if (player) {
      player.x = payload.x;
      player.y = payload.y;

      io.to(payload.roomId).emit("player:moved", {
        ...payload,
        socketId: socket.id,
      });
    }
  });

  socket.on("player:action", (action: string) => {
    socket.broadcast.emit("player:acted", {
      action: action,
      socketId: socket.id,
    });
  });
};
