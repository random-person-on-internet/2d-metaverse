import { io } from "socket.io-client";

export const socket = io(
  import.meta.env.VITE_API_URL || "http://localhost:5000",
  {
    autoConnect: false,
    auth: (cb) => {
      cb({
        token: localStorage.getItem("token"),
      });
    },
  }
);
