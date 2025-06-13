import {
  TicTacToeRoom,
  ticTacToeRooms,
} from "../../cache/games/tictactoe.cache";

export const isValidMove = (
  board: string[][],
  x: number,
  y: number
): boolean => {
  return board[x][y] === "";
};

export const createTicTacToeRoom = (
  roomId: string,
  playerX: number,
  playerO: number
): TicTacToeRoom => {
  const room: TicTacToeRoom = {
    board: Array.from({ length: 3 }, () => Array(3).fill("")),
    players: [playerX, playerO],
    turn: playerX,
  };

  ticTacToeRooms.set(roomId, room);
  return room;
};

export const makeTicTacToeMove = (
  roomId: string,
  userId: number,
  x: number,
  y: number
): { valid: boolean; winner?: number | "draw"; board?: string[][] } => {
  const room = ticTacToeRooms.get(roomId);
  if (!room) return { valid: false };
  if (room.turn !== userId) return { valid: false };
  if (room.board[x][y] !== "") return { valid: false };

  const symbol = room.players[0] === userId ? "X" : "O";
  room.board[x][y] = symbol;

  const winner = checkWinner(room.board);
  if (winner !== null) {
    ticTacToeRooms.delete(roomId);
    return { valid: true, winner, board: room.board };
  }

  room.turn = room.players.find((id) => id !== userId)!;
  return { valid: true, board: room.board };
};

export const checkWinner = (board: string[][]): number | "draw" | null => {
  const lines = [
    // rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // colummns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  for (const line of lines) {
    if (line[0] !== "" && line[0] === line[1] && line[1] === line[2]) {
      return line[0] === "X" ? 1 : 2;
    }
  }

  if (board.flat().every((cell) => cell !== "")) return "draw";

  return null;
};
