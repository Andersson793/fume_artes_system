import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.PROD
    ? "https://fume-artes-api.onrender.com:3000"
    : "http://127.0.0.1:3000",
  timeout: 15000,
});
