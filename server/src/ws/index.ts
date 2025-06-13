import { Server } from "socket.io";
import { playerSocketHandler } from "./handlers/player.handler";
import { connectedPlayers } from "./cache/players";
import { itemSocketHandler } from "./handlers/items.handler";
import {
  handleRoomDisconnect,
  roomSocketHandler,
} from "./handlers/room.handler";

export const registerSocketHandlers = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    playerSocketHandler(io, socket);
    itemSocketHandler(io, socket);
    roomSocketHandler(io, socket);

    socket.on("disconnect", () => {
      const player = connectedPlayers.get(socket.id);
      if (player) {
        connectedPlayers.delete(socket.id);

        // clean room
        handleRoomDisconnect(socket.id, player.userId, io);

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
