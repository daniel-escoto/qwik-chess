import { Board } from "~/models/Board";
import { PieceColor, PieceType } from "~/models/Piece";
import { Position } from "~/models/Tile";
import { getColumnNumber, getColumnString, getValidMoves } from "../Board";
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

  const opposingValidMoves = getValidMoves(
    board,
    piece.color === PieceColor.White ? PieceColor.Black : PieceColor.White
  );

  const opposingValidMovesSet = new Set(
    opposingValidMoves.map((move) => {
      return `${move.column}${move.row}`;
    })
  );

  return moves.filter((move) => {
    return !opposingValidMovesSet.has(`${move.column}${move.row}`);
  });
};

// given a board, and a position of a king,
// return if the king is in check
export const isKingInCheck = (board: Board, position: Position): boolean => {
  const piece = getVerifiedPiece(board, position, PieceType.King);

  if (!piece) {
    return false;
  }

  const opposingValidMoves = getValidMoves(
    board,
    piece.color === PieceColor.White ? PieceColor.Black : PieceColor.White
  );

  const opposingValidMovesSet = new Set(
    opposingValidMoves.map((move) => {
      return `${move.column}${move.row}`;
    })
  );

  return opposingValidMovesSet.has(`${position.column}${position.row}`);
};

// given a board, and a position of a king,
// return if the king is in checkmate
export const isKingInCheckmate = (
  board: Board,
  position: Position
): boolean => {
  const piece = getVerifiedPiece(board, position, PieceType.King);

  if (!piece) {
    return false;
  }

  const validMoves = getValidMoves(board, piece.color);

  if (validMoves.length > 0) {
    return false;
  }

  return isKingInCheck(board, position);
};
