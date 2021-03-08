import axios from "axios";
import { API_URL } from "./config";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    config.headers.Authorization = `${token}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
