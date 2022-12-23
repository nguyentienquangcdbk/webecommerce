import create from "zustand";
import axiosClient from "../api/axiosClient";

export const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
  token: "",
  setToken: (token) => set({ token: token }),
  updateUser: async () => {
    const res = await axiosClient.get("/me");
    console.log(res);
    set({ user: res?.data.user });
    // setItemCart(data?.data?.user.cart.items);
  },
}));
