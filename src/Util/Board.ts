import { Tile } from "~/models/Tile";
import { Piece, PieceType } from "~/models/Piece";
import { Board } from "~/models/Board";
import { getPieceMoves } from "./Piece";

// generate a board with the starting pieces in the correct positions
export const getStartingBoard = (): Board => {
  const tiles: Tile[] = [];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = getStartingPiece(x, y);
      const color = getTileColor(x, y);
      const position = { row: 8 - y, column: String.fromCharCode(97 + x) };
      tiles.push({ piece, color, position });
    }
  }

  return { tiles };
};

// given a column and row, return the color of the tile
const getTileColor = (x: number, y: number): "white" | "black" => {
  if (y % 2 === 0) {
    return x % 2 === 0 ? "white" : "black";
  } else {
    return x % 2 === 0 ? "black" : "white";
  }
};

// given a column and row, return the piece that should be there
// at the start of the game
const getStartingPiece = (x: number, y: number): Piece | null => {
  if (y === 1) {
    return { type: PieceType.Pawn, color: "black" };
  } else if (y === 6) {
    return { type: PieceType.Pawn, color: "white" };
  } else if (y === 0) {
    return getStartingPieceForBlack(x);
  } else if (y === 7) {
    return getStartingPieceForWhite(x);
  } else {
    return null;
  }
};

// given a column, return the black piece that should be there
// at the start of the game
const getStartingPieceForBlack = (x: number): Piece => {
  switch (x) {
    case 0:
    case 7:
      return { type: PieceType.Rook, color: "black" };
    case 1:
    case 6:
      return { type: PieceType.Knight, color: "black" };
    case 2:
    case 5:
      return { type: PieceType.Bishop, color: "black" };
    case 3:
      return { type: PieceType.Queen, color: "black" };
    case 4:
      return { type: PieceType.King, color: "black" };
    default:
      throw new Error("Invalid starting piece");
  }
};

// given a column, return the white piece that should be there
const getStartingPieceForWhite = (x: number): Piece => {
  switch (x) {
    case 0:
    case 7:
      return { type: PieceType.Rook, color: "white" };
    case 1:
    case 6:
      return { type: PieceType.Knight, color: "white" };
    case 2:
    case 5:
      return { type: PieceType.Bishop, color: "white" };
    case 3:
      return { type: PieceType.Queen, color: "white" };
    case 4:
      return { type: PieceType.King, color: "white" };
    default:
      throw new Error("Invalid starting piece");
  }
};

// given a pgn file, return a list of moves
export const getMovesFromPgn = (pgn: string): string[] => {
  const lines = pgn.split("\r").join("").split("\n");
  const moves = [];
  for (const line of lines) {
    if (line.startsWith("1.")) {
      const moveStrings = line.split(" ");
      for (const moveString of moveStrings) {
        if (moveString !== "1." && moveString !== "") {
          moves.push(moveString);
        }
      }
    }
  }
  return moves;
};

// given a list of moves, return a list of boards
export const getBoardsFromMoves = (moves: string[]): Board[] => {
  const boards = [];
  let board = getStartingBoard();
  boards.push(board);
  for (const move of moves) {
    board = getBoardFromMove(board, move);
    boards.push(board);
  }
  return boards;
};

// given a board and a move, return a new board
export const getBoardFromMove = (board: Board, move: string): Board => {
  const newBoard = { tiles: [...board.tiles] };
  const moveFrom = move.substring(0, 2);
  const moveTo = move.substring(2, 4);
  const tileFrom = newBoard.tiles.find(
    (tile) =>
      tile.position.column === moveFrom[0] && tile.position.row === +moveFrom[1]
  );
  const tileTo = newBoard.tiles.find(
    (tile) =>
      tile.position.column === moveTo[0] && tile.position.row === +moveTo[1]
  );
  if (tileFrom && tileTo) {
    tileTo.piece = tileFrom.piece;
    tileFrom.piece = null;
  }
  return newBoard;
};

// given a list of moves, return the most recent board state
// starting from the starting board state
export const getBoardState = (board: Board, moves: string[]): Board => {
  let newBoard = board;
  for (let move of moves) {
    newBoard = makeMove(newBoard, move);
  }
  return newBoard;
};

// given a board, and a move, return a new board state
export const makeMove = (board: Board, move: string): Board => {
  const newBoard = { ...board };
  const fromColumn = move[0];
  const fromRow = parseInt(move[1]);
  const toColumn = move[2];
  const toRow = parseInt(move[3]);
  const fromTile = newBoard.tiles.find(
    (tile) =>
      tile.position.column === fromColumn && tile.position.row === fromRow
  );
  const toTile = newBoard.tiles.find(
    (tile) => tile.position.column === toColumn && tile.position.row === toRow
  );
  if (fromTile && toTile) {
    toTile.piece = fromTile.piece;
    fromTile.piece = null;
  }
  return newBoard;
};

// given a column string, return the column number
export const getColumnNumber = (column: string): number => {
  switch (column) {
    case "a":
      return 1;
    case "b":
      return 2;
    case "c":
      return 3;
    case "d":
      return 4;
    case "e":
      return 5;
    case "f":
      return 6;
    case "g":
      return 7;
    case "h":
      return 8;
    default:
      throw new Error("Invalid column");
  }
};

// given a column number, return the column string
export const getColumnString = (column: number): string => {
  switch (column) {
    case 1:
      return "a";
    case 2:
      return "b";
    case 3:
      return "c";
    case 4:
      return "d";
    case 5:
      return "e";
    case 6:
      return "f";
    case 7:
      return "g";
    case 8:
      return "h";
    default:
      throw new Error("Invalid column");
  }
};
