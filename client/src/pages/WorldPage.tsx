import { useEffect, useState } from "react";
import type {
  PlayerData,
  PlayerLeftPayload,
  PlayerMovedPayload,
} from "../types/socketPayloads";
import { SocketEmitEvents, SocketListenEvents } from "../types/socketEvents";
import type { Room } from "../types/roomApi.types";
import { socket } from "../ws/socket";
import { useUserStore } from "../stores/userStore";
import { getRoomById } from "../api/roomApi";

export default function WorldPage() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [room, setRoom] = useState<Room | null>(null);
  const userId = useUserStore((s) => s.user?.id);

  useEffect(() => {
    const connect = async () => {
      socket.connect();
      const token = localStorage.getItem("token");

      console.log("Fetched token:", token);
      if (!token) {
        console.error("No token found.");
        return;
      }

      const worldRoom = await getRoomById(1, token!);
      setRoom(worldRoom);

      socket.emit(SocketEmitEvents.ROOM_JOIN, {
        roomId: worldRoom.id,
        userId: userId,
      });
    };

    connect();

    socket.on(SocketListenEvents.PLAYER_ALL, (playerList: PlayerData[]) => {
      setPlayers(playerList);
    });

    socket.on(
      SocketListenEvents.PLAYER_MOVED,
      (payload: PlayerMovedPayload) => {
        setPlayers((prev) =>
          prev.map((p) =>
            p.userId === payload.userId
              ? { ...p, x: payload.x, y: payload.y }
              : p
          )
        );
      }
    );

    socket.on(SocketListenEvents.PLAYER_LEFT, (payload: PlayerLeftPayload) => {
      setPlayers((prev) => prev.filter((p) => p.userId !== payload.userId));
    });

    // clean on unmount
    return () => {
      socket.disconnect();
      socket.off(SocketListenEvents.PLAYER_ALL);
      socket.off(SocketListenEvents.PLAYER_MOVED);
      socket.off(SocketListenEvents.PLAYER_LEFT);
    };
  }, [userId]);

  // move function for testing
  const move = (dx: number, dy: number) => {
    if (!room) return;

    const me = players.find((p) => p.userId === userId);
    if (!me) return;

    // me?.x ?? 0 + dx IS NOT (me?.x ?? 0) + dx
    // learnt that after hours, do not forget this future ved
    const newX = Math.max(0, Math.min(room.xlen, me.x + dx));
    const newY = Math.max(0, Math.min(room.ylen, me.y + dy));

    socket.emit(SocketEmitEvents.PLAYER_MOVE, {
      userId: userId,
      roomId: room.id,
      x: newX,
      y: newY,
      direction: "right",
    });
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") move(0, -1);
    if (e.key === "ArrowDown") move(0, 1);
    if (e.key === "ArrowLeft") move(-1, 0);
    if (e.key === "ArrowRight") move(1, 0);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [players, room]);

  if (!room) {
    return <div className="text-while p-4"> Loading world...</div>;
  }

  return (
    <div className="p-8 bg-black">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${room.xlen}, 1fr)`,
          gridTemplateRows: `repeat(${room.ylen}, 1fr)`,
        }}
      >
        {Array.from({ length: room.xlen * room.ylen }).map((_, index) => {
          const x = index % room.xlen;
          const y = Math.floor(index / room.xlen);
          const playerHere = players.find((p) => p.x === x && p.y === y);

          return (
            <div
              key={index}
              className={`w-6 h-6 border border-gray-600 relative ${
                playerHere ? "bg-green-500" : "bg-black"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}
