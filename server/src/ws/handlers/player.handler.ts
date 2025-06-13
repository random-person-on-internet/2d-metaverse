import { Server, Socket } from "socket.io";
import { connectedPlayers } from "../cache/players";

interface MovePayload {
  x: number;
  y: number;
  direction: string;
  userId: number;
}

export const playerSocketHandler = (io: Server, socket: Socket) => {
  socket.on("player:join", (userId: number) => {
    console.log(`Player ${userId} joined`);

    connectedPlayers.set(socket.id, { userId, x: 0, y: 0 });

    socket.emit(
      "player:all",
      Array.from(connectedPlayers.entries()).map(([id, player]) => ({
        socketId: id,
        ...player,
      }))
    );

    socket.broadcast.emit("player:joined", {
      userId: userId,
      socketId: socket.id,
      x: 0,
      y: 0,
    });
  });

  socket.on("player:move", (payload: MovePayload) => {
    const player = connectedPlayers.get(socket.id);
    if (player) {
      player.x = payload.x;
      player.y = payload.y;

      socket.broadcast.emit("player:moved", {
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
