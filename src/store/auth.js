import create from "zustand";

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  token: "",
  setToken: (token) => set({ token: token }),
}));
