import axios from "axios";

export const api = axios.create({
  baseURL: "https://streamify-backend-9m71.onrender.com/api",
  withCredentials: true
});
