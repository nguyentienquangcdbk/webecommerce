import create from "zustand";
// import itemCartAPi from "../api/itemCartApi";
import cartAPi from "../api/cartAPi";

export const useCart = create((set) => ({
  itemCart: [],
  counter: null,
  setItemCart: (itemCart) => set({ itemCart: itemCart }),
  setCounter: (idItem) => set({ counter: idItem }),
  updateCart: async (id) => {
    const res = await cartAPi.show(id);
    console.log(res);
    set({ itemCart: res?.data.itemCart });
    set({ counter: null });
  },
}));
