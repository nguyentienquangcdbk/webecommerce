import axiosClient from "./axiosClient";

const categoryApi = {
  getAll(params) {
    const url = "/categories";
    return axiosClient.get(url, { params });
  },
  getId(id) {
    return axiosClient.get(`/categories/${id}`);
  },
  add(data) {
    return axiosClient.post("/categories", data);
  },
  update(id, data) {
    return axiosClient.patch(`/categories/${id}`, data);
  },
  delete(id) {
    return axiosClient.delete(`/categories/${id}`);
  },
};

export default categoryApi;
