import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://study-hub-server-1.vercel.app",
  withCredentials: true
})