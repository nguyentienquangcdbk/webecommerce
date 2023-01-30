import axios from "axios";

// const getToken = () => localStorage.getItem("token");
const axiosClient = axios.create({
  baseURL: "https://dbshopjson-w3pz.vercel.app/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: `Bearer ${getToken()}`,
  },
});

export default axiosClient;
