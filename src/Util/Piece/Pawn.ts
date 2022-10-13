import { Board } from "~/models/Board";
import { PieceType, PieceColor } from "~/models/Piece";
import { Position } from "~/models/Tile";
import { getColumnNumber, getColumnString } from "../Board";
import { getVerifiedPiece } from "./Piece";

// given a board, a piece color, and a position of a pawn, return all the
// possible moves for that pawn
export const getPawnMoves = (board: Board, position: Position): Position[] => {
  const column = getColumnNumber(position.column); // 1-8
  const row = position.row; // 1-8

  const tiles = board.tiles.flat();

  const moves: Position[] = [];

  const piece = getVerifiedPiece(board, position, PieceType.Pawn);

  if (!piece) {
    return [];
  }

  const pieceColor = piece.color;

  if (pieceColor === PieceColor.White) {
    // check if the pawn is on the last row
    if (row === 8) {
      return [];
    }

    // check if the pawn can move forward 1 space
    const forwardOneSpace = tiles.find((tile) => {
      return (
        tile.position.column === position.column &&
        tile.position.row === row + 1
      );
    });

    if (!forwardOneSpace) {
      return [];
    }

    if (!forwardOneSpace.piece) {
      moves.push({ column: position.column, row: row + 1 });
    }

    // check if the pawn can move forward 2 spaces
    if (row === 2) {
      const forwardTwoSpaces = tiles.find((tile) => {
        return (
          tile.position.column === position.column &&
          tile.position.row === row + 2
        );
      });

      if (!forwardTwoSpaces) {
        return [];
      }

      if (!forwardTwoSpaces.piece) {
        moves.push({ column: position.column, row: row + 2 });
      }
    }

    // check if the pawn can move right 1 space
    if (column < 8) {
      const rightOneSpace = tiles.find((tile) => {
        return (
          tile.position.column === getColumnString(column + 1) &&
          tile.position.row === row + 1
        );
      });

      if (!rightOneSpace) {
        return [];
      }

      if (rightOneSpace.piece) {
        moves.push({
          column: getColumnString(column + 1),
          row: row + 1,
        });
      }
    }

    // check if the pawn can move left 1 space
    if (column > 1) {
      const leftOneSpace = tiles.find((tile) => {
        return (
          tile.position.column === getColumnString(column - 1) &&
          tile.position.row === row + 1
        );
      });

      if (!leftOneSpace) {
        return [];
      }

      if (leftOneSpace.piece) {
        moves.push({
          column: getColumnString(column - 1),
          row: row + 1,
        });
      }
    }
  } else {
    // check if the pawn is on the first row
    if (row === 1) {
      return [];
    }

    // check if the pawn can move forward 1 space
    const forwardOneSpace = tiles.find((tile) => {
      return (
        tile.position.column === position.column &&
        tile.position.row === row - 1
      );
    });

    if (!forwardOneSpace) {
      return [];
    }

    if (!forwardOneSpace.piece) {
      moves.push({ column: position.column, row: row - 1 });
    }

    // check if the pawn can move forward 2 spaces
    if (row === 7) {
      const forwardTwoSpaces = tiles.find((tile) => {
        return (
          tile.position.column === position.column &&
          tile.position.row === row - 2
        );
      });

      if (!forwardTwoSpaces) {
        return [];
      }

      if (!forwardTwoSpaces.piece) {
        moves.push({ column: position.column, row: row - 2 });
      }
    }

    // check if the pawn can move right 1 space
    if (column < 8) {
      const rightOneSpace = tiles.find((tile) => {
        return (
          tile.position.column === getColumnString(column + 1) &&
          tile.position.row === row - 1
        );
      });

      if (!rightOneSpace) {
        return [];
      }

      if (rightOneSpace.piece) {
        moves.push({
          column: getColumnString(column + 1),
          row: row - 1,
        });
      }
    }

    // check if the pawn can move left 1 space
    if (column > 1) {
      const leftOneSpace = tiles.find((tile) => {
        return (
          tile.position.column === getColumnString(column - 1) &&
          tile.position.row === row - 1
        );
      });

      if (!leftOneSpace) {
        return [];
      }

      if (leftOneSpace.piece) {
        moves.push({
          column: getColumnString(column - 1),
          row: row - 1,
        });
      }
    }
  }

  return moves;
};
