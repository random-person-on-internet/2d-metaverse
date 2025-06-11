import dotenv from "dotenv";
dotenv.config();
import http from "http";
import app from "./app";
import { Server } from "socket.io";
import { initSocketServer } from "./sockets";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

initSocketServer(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
