import { Server, Socket } from "socket.io";
import {
  createTicTacToeRoom,
  makeTicTacToeMove,
} from "../../logic/games/tictactoe.logic";

interface GameStartPayload {
  roomId: string;
  playerX: number;
  playerO: number;
}

interface GameMovePayload {
  roomId: string;
  userId: number;
  x: number;
  y: number;
}

export const ticTacToeSocketHandler = (io: Server, socket: Socket) => {
  socket.on("tictactoe:start", (payload: GameStartPayload) => {
    const { playerO, playerX, roomId } = payload;
    const room = createTicTacToeRoom(roomId, playerX, playerO);

    io.to(roomId).emit("tictactoe:started", {
      roomId,
      players: room.players,
      board: room.board,
      turn: room.turn,
    });
  });

  socket.on("tictactoe:move", (payload: GameMovePayload) => {
    const { roomId, userId, x, y } = payload;
    const result = makeTicTacToeMove(roomId, userId, x, y);

    if (!result.valid) {
      socket.emit("tictactoe:invalid-move", {
        x: x,
        y: y,
      });
      return;
    }

    io.to(roomId).emit("tictactoe:move-made", {
      roomId: roomId,
      userId: userId,
      board: result.board,
      x: x,
      y: y,
    });

    if (result.winner) {
      io.to(roomId).emit("tictactoe:game-over", {
        roomId: roomId,
        winner: result.winner,
      });
      return;
    }
  });
};
