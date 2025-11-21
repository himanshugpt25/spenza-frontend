import axios from "axios";
import { API_BASE_URL } from "./endpoints";
import { authEvents } from "../context/authEvents";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      authEvents.emitUnauthorized();
    }
    return Promise.reject(error);
  }
);
