import { Server } from "socket.io";
import ioClient from "socket.io-client";
import { createServer } from "http";
import { AddressInfo } from "net";
import { registerSocketHandlers } from "../../src/ws";
import { Server as HttpServer } from "http";

let io: Server;
let server: HttpServer;
let clientSocket1: ReturnType<typeof ioClient>;
let clientSocket2: ReturnType<typeof ioClient>;

beforeAll((done) => {
  server = createServer();
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  registerSocketHandlers(io);

  server.listen(() => {
    const port = (server.address() as AddressInfo).port;
    clientSocket1 = ioClient(`http://localhost:${port}`);
    clientSocket2 = ioClient(`http://localhost:${port}`);

    let connected = 0;
    const checkReady = () => {
      connected++;
      if (connected === 2) done();
    };

    clientSocket1.on("connect", checkReady);
    clientSocket2.on("connect", checkReady);
  });
});

afterAll(async () => {
  await new Promise<void>((resolve) => io.close(() => resolve()));
  clientSocket1.close();
  clientSocket2.close();
  server.close();
});

describe("TicTacToe Socket Events", () => {
  it("starts a game and plays moves", (done) => {
    const roomId = "test-room";
    const playerX = 6969;
    const playerO = 9696;

    clientSocket1.emit("room:join", { roomId, userId: playerX });
    clientSocket2.emit("room:join", { roomId, userId: playerO });

    clientSocket1.emit("tictactoe:start", { roomId, playerX, playerO });

    clientSocket1.on(
      "tictactoe:started",
      (data: {
        roomId: string;
        players: [number, number];
        board: string[][];
        turn: number;
      }) => {
        expect(data.roomId).toBe(roomId);
        expect(data.players).toContain(playerX);
        expect(data.players).toContain(playerO);

        clientSocket1.emit("tictactoe:move", {
          roomId,
          userId: playerX,
          x: 0,
          y: 0,
        });

        clientSocket2.on(
          "tictactoe:move-made",
          (data: {
            roomId: string;
            userId: number;
            board: string[][];
            x: number;
            y: number;
          }) => {
            expect(data.board[0][0]).toBe("X");
            done();
          }
        );
      }
    );
  });
});
