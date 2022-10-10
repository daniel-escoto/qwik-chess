import { Tile } from "~/models/Tile";
import { Piece, PieceType } from "~/models/Piece";
import { Board } from "~/models/Board";

export const getStartingBoard = (): Board => {
  const tiles: Tile[] = [];
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const color = (x + y) % 2 === 0 ? "white" : "black";
      const piece = getStartingPiece(x, y);
      tiles.push({ color, piece, position: { x, y } });
    }
  }
  return { tiles };
};

const getStartingPiece = (x: number, y: number): Piece | null => {
  if (y === 1) {
    return { type: PieceType.Pawn, color: "black" };
  }
  if (y === 6) {
    return { type: PieceType.Pawn, color: "white" };
  }
  if (y === 0) {
    return getStartingBlackPiece(x);
  }
  if (y === 7) {
    return getStartingWhitePiece(x);
  }
  return null;
};

const getStartingBlackPiece = (x: number): Piece => {
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
      throw new Error("Invalid x position");
  }
};

const getStartingWhitePiece = (x: number): Piece => {
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
      throw new Error("Invalid x position");
  }
};
