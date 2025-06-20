import { useEffect, useState } from "react";
import type { PlayerData, PlayerMovedPayload } from "../types/socketPayloads";
import { socket } from "../ws/socket";
import { SocketEmitEvents, SocketListenEvents } from "../types/socketEvents";
import { useUserStore } from "../stores/userStore";

export default function WorldPage() {
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const userId = useUserStore((s) => s.user?.id);

  useEffect(() => {
    socket.connect();

    const roomId = "1";
    setCurrentRoomId(roomId);

    socket.emit(SocketEmitEvents.ROOM_JOIN, {
      roomId: roomId,
      userId: userId,
    });

    // listen all users from server
    socket.on(SocketListenEvents.PLAYER_ALL, (playerList: PlayerData[]) => {
      setPlayers(playerList);
    });

    // listen player movement
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

    // clean on unmount
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  // move function for testing
  const move = (dx: number, dy: number) => {
    if (!currentRoomId) return;

    const me = players.find((p) => p.userId === userId);
    if (!me) return;

    // me?.x ?? 0 + dx IS NOT (me?.x ?? 0) + dx
    // learnt that after hours, do not forget this future ved
    const newX = Math.max(0, Math.min(19, me.x + dx));
    const newY = Math.max(0, Math.min(19, me.y + dy));

    socket.emit(SocketEmitEvents.PLAYER_MOVE, {
      userId: userId,
      roomId: currentRoomId,
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
  }, [players, currentRoomId]);

  return (
    <>
      <div className="grid grid-cols-20 grid-rows-20 gap-1 p-8 bg-black">
        {Array.from({ length: 400 }).map((_, index) => {
          const x = index % 20;
          const y = Math.floor(index / 20);
          const playerHere = players.find((p) => p.x === x && p.y == y);

          return (
            <div
              key={index}
              className={`w-6 h-6 border border-gray-600 relative ${
                playerHere ? "bg-green-500" : "bg-black"
              }`}
            ></div>
          );
        })}
      </div>
    </>
  );
}
