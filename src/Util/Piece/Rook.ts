import { Board } from "~/models/Board";
import { PieceType } from "~/models/Piece";
import { Position } from "~/models/Tile";
import { getColumnNumber, getColumnString } from "../Board";
import { getVerifiedPiece } from "./Piece";

// helper for getRookMoves and getQueenMoves
export const getRookMovesHelper = (
  board: Board,
  position: Position
): Position[] => {
  const column = getColumnNumber(position.column); // 1-8
  const row = position.row; // 1-8

  const pieceColor = board.tiles[row - 1][column - 1].piece?.color;

  const tiles = board.tiles.flat();

  const moves: Position[] = [];

  const directions = [
    { column: 1, row: 0 },
    { column: -1, row: 0 },
    { column: 0, row: 1 },
    { column: 0, row: -1 },
  ];

  directions.forEach((direction) => {
    let currentColumn = column;
    let currentRow = row;

    while (true) {
      currentColumn += direction.column;
      currentRow += direction.row;

      if (currentColumn < 1 || currentColumn > 8) {
        break;
      }

      if (currentRow < 1 || currentRow > 8) {
        break;
      }

      const tile = tiles.find((tile) => {
        return (
          tile.position.column === getColumnString(currentColumn) &&
          tile.position.row === currentRow
        );
      });

      if (!tile) {
        break;
      }

      if (!tile.piece) {
        moves.push({
          column: getColumnString(currentColumn),
          row: currentRow,
        });
      } else if (tile.piece.color !== pieceColor) {
        moves.push({
          column: getColumnString(currentColumn),
          row: currentRow,
        });
        break;
      } else {
        break;
      }
    }
  });

  return moves;
};

// given a board, and a position of a rook, return all the possible moves
// for that rook
export const getRookMoves = (board: Board, position: Position): Position[] => {
  const piece = getVerifiedPiece(board, position, PieceType.Rook);

  if (!piece) {
    return [];
  }

  return getRookMovesHelper(board, position);
};
