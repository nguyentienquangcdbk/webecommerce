import axiosClient from "./axiosClient";

const itemCartAPi = {
  show(cartId) {
    const url = "/cartItem";
    return axiosClient.get(url, { id: cartId });
  },
  increment(id) {
    return axiosClient.post("/cartItem/increment", { id: id });
  },

  decrement(id) {
    return axiosClient.post("/cartItem/decrement", { id: id });
  },
  delete(id) {
    return axiosClient.delete("/cartItem/" + id);
  },
};

export default itemCartAPi;
