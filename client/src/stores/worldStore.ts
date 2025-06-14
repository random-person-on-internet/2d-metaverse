import { create } from "zustand";

export type Room = {
  id: number;
  name: string;
  description?: string;
  x: number;
  y: number;
  xlen: number;
  ylen: number;
  isPublic: boolean;
};
interface WorldStore {
  width: number;
  height: number;
  rooms: Room[];
  spawnPoint: [number, number];
  setWorldSize: (w: number, h: number) => void;
  setRooms: (rooms: Room[]) => void;
  setSpawnPoint: ([x, y]: [number, number]) => void;
}

export const useWorldStore = create<WorldStore>((set) => {
  return {
    height: 100,
    width: 100,
    spawnPoint: [0, 0],
    rooms: [],
    setRooms: (rooms) => set({ rooms }),
    setWorldSize: (width, height) => set({ width, height }),
    setSpawnPoint: ([x, y]) => set({ spawnPoint: [x, y] }),
  };
});
