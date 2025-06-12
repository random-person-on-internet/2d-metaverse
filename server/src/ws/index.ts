import { Server } from "socket.io";
import { playerSocketHandler } from "./handlers/player.handler";
import { connectedPlayers } from "./cache/players";

export const registerSocketHandlers = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    playerSocketHandler(io, socket);

    socket.on("disconnect", () => {
      const player = connectedPlayers.get(socket.id);
      if (player) {
        connectedPlayers.delete(socket.id);
        socket.broadcast.emit("player:left", {
          userId: player.userId,
          socketId: socket.id,
        });
      }

      console.log(
        `Player ${player?.userId} disconnecte\nSocket disconnected: ${socket.id}`
      );
    });
  });
};
