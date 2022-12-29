import axiosClient from "./axiosClient";

const imageApi = {
  postUpload(data) {
    const url = "/img/upload";
    return axiosClient.post(url, data);
  },
  postMultipart(data) {
    return axiosClient.post(`/img/uploads`, data);
  },

  delete(data) {
    return axiosClient.post(`/img/delete`, data);
  },
  removeProductImg(id) {
    return axiosClient.post("img/remove/" + id);
  },
};

export default imageApi;
