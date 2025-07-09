import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    const cleanToken = token.replace(/^"|"$/g, '');
    config.headers = config.headers || {};
    config.headers["Authorization"] = "Bearer " + cleanToken;
  }
  
  return config;
});
