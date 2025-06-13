export interface TicTacToeRoom {
  board: string[][];
  players: [number, number];
  turn: number;
}

export const ticTacToeRooms = new Map<string, TicTacToeRoom>();
