import { Server, Socket } from "socket.io";
import { registerRoomHandlers } from "./roomHandlers";

export const connectionHandler = (io: Server, socket: Socket) => {
  registerRoomHandlers(io, socket);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
};
