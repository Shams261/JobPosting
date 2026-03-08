import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:3001";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000
});
