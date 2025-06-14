import { create } from "zustand";

type ItemInstance = {
  id: number;
  definitionId: number;
  x?: number;
  y?: number;
  stackCount: number;
  isEquipped?: boolean;
  isPlaced?: boolean;
};

export type User = {
  id: number;
  username: string;
  avatar?: string;
  coins: number;
  items: ItemInstance[];
};

interface UserStore {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setItems: (items: ItemInstance[]) => void;
  updateCoins: (amount: number) => void;
  isLoggedIn: boolean;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => {
  return {
    user: null,
    token: null,
    isLoggedIn: false,
    setUser: (user) => set({ user: user, isLoggedIn: true }),
    setToken: (token) => set({ token }),
    logout: () => set({ user: null, token: null, isLoggedIn: false }),
    setItems: (items) =>
      set((state) => (state.user ? { user: { ...state.user, items } } : {})),
    updateCoins: (amount) =>
      set((state) => {
        return state.user ? { user: { ...state.user, coins: amount } } : {};
      }),
  };
});
