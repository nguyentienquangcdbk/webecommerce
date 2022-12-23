import axiosClient from "./axiosClient";

const cartAPi = {
  show(cartId) {
    // const url = "/cart";
    return axiosClient.get("/cart/" + cartId);
  },

  add(data) {
    return axiosClient.post("/cart", data);
  },
};

export default cartAPi;
