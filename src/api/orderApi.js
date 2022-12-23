import axiosClient from "./axiosClient";

const orderAPi = {
  getAll() {
    const url = "/order";
    return axiosClient.get(url);
  },
  getId(id) {
    const url = `/order/${id}`;
    return axiosClient.get(url);
  },
  add(data) {
    return axiosClient.post("/order", data);
  },

  delete(id) {
    return axiosClient.delete("/order/" + id);
  },
};

export default orderAPi;
