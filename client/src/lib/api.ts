import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  get: <T>(url: string, token?: string) =>
    axiosInstance
      .get<T>(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => res.data),

  post: <T>(url: string, body?: any, token?: string) =>
    axiosInstance
      .post<T>(url, body, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => res.data),

  patch: <T>(url: string, body?: any, token?: string) => {
    axiosInstance
      .patch<T>(url, body, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => res.data);
  },

  delete: <T>(url: string, token?: string) =>
    axiosInstance
      .delete<T>(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((res) => res.data),
};
