import { Board } from "~/models/Board";
import { PieceType } from "~/models/Piece";
import { Position } from "~/models/Tile";
import { getColumnNumber, getColumnString } from "../Board";
import { getVerifiedPiece } from "./Piece";

// given a board, and a position of a king, return all the possible moves
// for that king
export const getKingMoves = (board: Board, position: Position): Position[] => {
  const column = getColumnNumber(position.column);
  const row = position.row;

  const moves: Position[] = [];

  const tiles = board.tiles.flat();

  const piece = getVerifiedPiece(board, position, PieceType.King);

  if (!piece) {
    return [];
  }

  const directions = [
    { column: 1, row: 0 },
    { column: -1, row: 0 },
    { column: 0, row: 1 },
    { column: 0, row: -1 },
    { column: 1, row: 1 },
    { column: 1, row: -1 },
    { column: -1, row: 1 },
    { column: -1, row: -1 },
  ];

  directions.forEach((direction) => {
    let currentColumn = column;
    let currentRow = row;

    currentColumn += direction.column;
    currentRow += direction.row;

    if (currentColumn < 1 || currentColumn > 8) {
      return;
    }

    if (currentRow < 1 || currentRow > 8) {
      return;
    }

    const tile = tiles.find((tile) => {
      return (
        tile.position.column === getColumnString(currentColumn) &&
        tile.position.row === currentRow
      );
    });

    if (!tile) {
      return;
    }

    if (!tile.piece) {
      moves.push({
        column: getColumnString(currentColumn),
        row: currentRow,
      });
    } else if (tile.piece.color !== piece.color) {
      moves.push({
        column: getColumnString(currentColumn),
        row: currentRow,
      });
    }

    return;
  });

  return moves;
};
