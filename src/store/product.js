import create from "zustand";
// import axiosClient from "../api/axiosClient";
import productAPi from "../api/productAPi";

export const productStore = create((set) => ({
  listProduct: null,
  setProduct: async (product) => {
    const res = await productAPi.getAll();
    console.log(res?.data.data);
    set({ listProduct: res?.data.data });
  },
}));
