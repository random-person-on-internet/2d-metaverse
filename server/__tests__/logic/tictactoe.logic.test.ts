import { checkWinner } from "../../src/ws/logic/games/tictactoe.logic";

describe("checkWinner", () => {
  it("detects row win", () => {
    const board = [
      ["X", "X", "X"],
      ["O", "", ""],
      ["", "", ""],
    ];
    expect(checkWinner(board, [0, 1])).toBe(0);
  });

  it("detects column win", () => {
    const board = [
      ["O", "", ""],
      ["O", "", ""],
      ["O", "", ""],
    ];
    expect(checkWinner(board, [0, 1])).toBe(1);
  });

  it("detects diagonal win", () => {
    const board = [
      ["X", "", ""],
      ["", "X", ""],
      ["", "", "X"],
    ];
    expect(checkWinner(board, [0, 1])).toBe(0);
  });

  it("detects draw", () => {
    const board = [
      ["X", "O", "X"],
      ["X", "O", "O"],
      ["O", "X", "X"],
    ];
    expect(checkWinner(board, [0, 1])).toBe("draw");
  });

  it("returns null for ongoing game", () => {
    const board = [
      ["X", "", ""],
      ["", "O", ""],
      ["", "", ""],
    ];
    expect(checkWinner(board, [0, 1])).toBeNull();
  });
});
