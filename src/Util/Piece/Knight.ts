import { Board } from "~/models/Board";
import { PieceType } from "~/models/Piece";
import { Position } from "~/models/Tile";
import { getColumnNumber, getColumnString } from "../Board";
import { getVerifiedPiece } from "./Piece";

// given a board, and a position of a knight, return all the possible moves
// for that knight
export const getKnightMoves = (
  board: Board,
  position: Position
): Position[] => {
  const column = getColumnNumber(position.column); // 1-8
  const row = position.row; // 1-8

  const tiles = board.tiles.flat();

  const moves: Position[] = [];

  const piece = getVerifiedPiece(board, position, PieceType.Knight);

  if (!piece) {
    return [];
  }

  const pieceColor = piece.color;

  const possibleMoves = [
    { column: column + 2, row: row + 1 },
    { column: column + 2, row: row - 1 },
    { column: column - 2, row: row + 1 },
    { column: column - 2, row: row - 1 },
    { column: column + 1, row: row + 2 },
    { column: column + 1, row: row - 2 },
    { column: column - 1, row: row + 2 },
    { column: column - 1, row: row - 2 },
  ];

  possibleMoves.forEach((move) => {
    if (move.column > 0 && move.column < 9 && move.row > 0 && move.row < 9) {
      const tile = tiles.find((tile) => {
        return (
          tile.position.column === getColumnString(move.column) &&
          tile.position.row === move.row
        );
      });

      if (!tile) {
        return;
      }

      if (!tile.piece) {
        moves.push({ column: getColumnString(move.column), row: move.row });
      } else if (tile.piece.color !== pieceColor) {
        moves.push({ column: getColumnString(move.column), row: move.row });
      }
    }
  });

  return moves;
};
