import { create } from "zustand";
import type { User } from "./userStore";

export type Player = {
  userId: number;
  user: User;
  x: number;
  y: number;
  team?: string;
};

interface RoomState {
  currentRoomId: number | null;
  players: Record<number, Player>;
  myPosition: { x: number; y: number };
  isInRoom: boolean;
  setCurrentRoom: (roomId: number | null) => void;
  updatePlayer: (player: Player) => void;
  removePlayer: (userId: number) => void;
  setPlayers: (players: Player[]) => void;
  clearRoom: () => void;
  moveMe: (x: number, y: number) => void;
}

export const useRoomState = create<RoomState>((set) => {
  return {
    currentRoomId: null,
    players: {},
    myPosition: { x: 0, y: 0 },
    isInRoom: false,
    setCurrentRoom: (id) => set({ currentRoomId: id, isInRoom: id !== null }),
    moveMe: (x, y) => set({ myPosition: { x, y } }),
    updatePlayer: (player) =>
      set((state) => {
        return {
          players: { ...state.players, [player.userId]: player },
        };
      }),
    removePlayer: (id) =>
      set((state) => {
        const newPlayers = { ...state.players };
        delete newPlayers[id];
        return { players: newPlayers };
      }),
    clearRoom: () =>
      set({
        currentRoomId: null,
        players: {},
        myPosition: { x: 0, y: 0 },
        isInRoom: false,
      }),
    setPlayers: (players) => {
      const record: Record<number, Player> = {};
      for (const p of players) record[p.userId] = p;
      set({ players: record });
    },
  };
});
