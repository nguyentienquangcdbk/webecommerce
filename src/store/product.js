import create from "zustand";
// import axiosClient from "../api/axiosClient";
import productAPi from "../api/productAPi";

export const productStore = create((set) => ({
  listProduct: null,
  setProduct: (product) => {
    set({ listProduct: product });
  },
}));
