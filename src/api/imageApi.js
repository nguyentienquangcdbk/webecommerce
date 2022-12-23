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
};

export default imageApi;
