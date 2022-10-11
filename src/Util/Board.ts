import { Tile } from "~/models/Tile";
import { Piece, PieceType } from "~/models/Piece";
import { Board } from "~/models/Board";

export const getStartingBoard = (): Board => {
  // rows are 0-7, columns are a-h
  const tiles: Tile[] = [];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = getStartingPiece(x, y);
      const color = getTileColor(x, y);
      const position = { row: y, column: String.fromCharCode(97 + x) };
      tiles.push({ piece, color, position });
    }
  }
  return { tiles };
};

const getTileColor = (x: number, y: number): "white" | "black" => {
  if (y % 2 === 0) {
    return x % 2 === 0 ? "white" : "black";
  } else {
    return x % 2 === 0 ? "black" : "white";
  }
};

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
