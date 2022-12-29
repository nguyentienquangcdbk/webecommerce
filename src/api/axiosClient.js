import axios from "axios";

const getToken = () => localStorage.getItem("token");
const axiosClient = axios.create({
  baseURL: "http://103.82.27.248/api/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${getToken()}`,
  },
});

export default axiosClient;
