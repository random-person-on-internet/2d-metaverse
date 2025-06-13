export interface TicTacToeRoom {
  board: string[][];
  players: number[];
  turn: number;
}

export const ticTacToeRooms = new Map<string, TicTacToeRoom>();
