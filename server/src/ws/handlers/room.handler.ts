import { Server, Socket } from "socket.io";
import { roomUsers } from "../cache/rooms";

interface RoomPayload {
  roomId: string;
  userId: number;
}

export const roomSocketHandler = (io: Server, socket: Socket) => {
  socket.on("room:join", (payload: RoomPayload) => {
    const { roomId, userId } = payload;
    socket.join(roomId);

    if (!roomUsers.has(roomId)) {
      roomUsers.set(roomId, new Set());
    }
    roomUsers.get(roomId)!.add(userId);

    io.to(roomId).emit("room:joined", {
      userId: userId,
      socketId: socket.id,
    });
  });

  socket.on("room:leave", (payload: RoomPayload) => {
    const { roomId, userId } = payload;
    socket.leave(roomId);

    if (!roomId) return;
    roomUsers.get(roomId)?.delete(userId);

    io.to(roomId).emit("room:left", {
      userId,
      socketId: socket.id,
    });
  });
};

export const handleRoomDisconnect = (
  socketId: string,
  userId: number,
  io: Server
) => {
  for (const [roomId, userSet] of roomUsers.entries()) {
    if (userSet.has(userId)) {
      userSet.delete(userId);

      io.to(roomId).emit("room:left", {
        userId: userId,
        socketId: socketId,
      });
    }
  }
};
