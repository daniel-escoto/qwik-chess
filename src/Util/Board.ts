import { Tile } from "~/models/Tile";
import { Piece, PieceType } from "~/models/Piece";
import { Board } from "~/models/Board";

// generate a board with the starting pieces in the correct positions
// a - h are the columns, left to right
// 1 - 8 are the rows, bottom to top
// each tile has a color, piece, and position
export const generateBoard = (): Board => {
  const tiles: Tile[][] = [];

  for (let row = 1; row <= 8; row++) {
    const rowTiles: Tile[] = [];

    for (let column = 1; column <= 8; column++) {
      const color = (row + column) % 2 === 0 ? "white" : "black";
      const piece = getStartingPiece(row, column);
      const colString = getColumnString(column);

      rowTiles.push({
        color,
        piece,
        position: { column: colString, row },
      });
    }

    tiles.push(rowTiles);
  }

  return { tiles };
};

// generate a board with with starting pieces in the correct positions
// but no pawns
export const generateBoardWithoutPawns = (): Board => {
  const tiles: Tile[][] = [];

  for (let row = 1; row <= 8; row++) {
    const rowTiles: Tile[] = [];

    if (row === 2 || row === 7) {
      for (let column = 1; column <= 8; column++) {
        const color = (row + column) % 2 === 0 ? "white" : "black";
        const colString = getColumnString(column);

        rowTiles.push({
          color,
          piece: null,
          position: { column: colString, row },
        });
      }
    } else {
      for (let column = 1; column <= 8; column++) {
        const color = (row + column) % 2 === 0 ? "white" : "black";
        const piece = getStartingPiece(row, column);
        const colString = getColumnString(column);

        rowTiles.push({
          color,
          piece,
          position: { column: colString, row },
        });
      }
    }

    tiles.push(rowTiles);
  }

  return { tiles };
};

// given a row and column, return the piece that should be there
// at the start of the game
const getStartingPiece = (y: number, x: number): Piece | null => {
  if (y === 1) {
    return getStartingPieceForWhite(x);
  } else if (y === 2) {
    return { type: PieceType.Pawn, color: "white" };
  } else if (y === 7) {
    return { type: PieceType.Pawn, color: "black" };
  } else if (y === 8) {
    return getStartingPieceForBlack(x);
  } else {
    return null;
  }
};

// given a column, return the black piece that should be there
const getStartingPieceForBlack = (x: number): Piece => {
  switch (x) {
    case 1:
    case 8:
      return { type: PieceType.Rook, color: "black" };
    case 2:
    case 7:
      return { type: PieceType.Knight, color: "black" };
    case 3:
    case 6:
      return { type: PieceType.Bishop, color: "black" };
    case 4:
      return { type: PieceType.Queen, color: "black" };
    case 5:
      return { type: PieceType.King, color: "black" };
    default:
      throw new Error("Invalid starting piece");
  }
};

// given a column, return the white piece that should be there
const getStartingPieceForWhite = (x: number): Piece => {
  switch (x) {
    case 1:
    case 8:
      return { type: PieceType.Rook, color: "white" };
    case 2:
    case 7:
      return { type: PieceType.Knight, color: "white" };
    case 3:
    case 6:
      return { type: PieceType.Bishop, color: "white" };
    case 4:
      return { type: PieceType.Queen, color: "white" };
    case 5:
      return { type: PieceType.King, color: "white" };
    default:
      throw new Error("Invalid starting piece");
  }
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
