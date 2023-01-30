import axiosClient from "./axiosClient";

const productAPi = {
  getAll(params) {
    const url = "/products";
    return axiosClient.get(url, { params });
  },
  getId(id) {
    return axiosClient.get(`/products/${id}`);
  },
  add(data) {
    return axiosClient.post("/products", data);
  },
  update(id, data) {
    return axiosClient.patch(`/products/${id}`, data);
  },
  delete(id) {
    return axiosClient.delete(`/products/${id}`);
  },
};

export default productAPi;
