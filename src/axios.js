import axios from "axios";

export const instance = axios.create({
  baseURL: "http://127.0.0.1:3000",
  timeout: 15000,
  headers: {
    //"Access-Control-Allow-Origin": "*",
  },
});
