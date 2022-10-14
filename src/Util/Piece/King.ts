import { Board } from "~/models/Board";
import { PieceColor, PieceType } from "~/models/Piece";
import { Position, Tile } from "~/models/Tile";
import { getColumnNumber, getColumnString, getValidMoves } from "../Board";
import { getAdjacentTiles } from "../Tile";
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

// given a board, and a color,
// return the tile of the king of that color
export const getKingPosition = (board: Board, color: PieceColor): Tile => {
  const tiles = board.tiles.flat();

  const kingTile = tiles.find((tile) => {
    return tile.piece?.type === PieceType.King && tile.piece?.color === color;
  });

  if (!kingTile) {
    throw new Error("King not found");
  }

  return kingTile;
};

// given a board, and a color
// return if the king is in check
export const isKingInCheck = (board: Board, color: PieceColor): boolean => {
  const kingTile = getKingPosition(board, color);
  const king = kingTile.piece;

  if (!king) {
    throw new Error("King not found");
  }

  const opposingValidMoves = getValidMoves(
    board,
    color === PieceColor.White ? PieceColor.Black : PieceColor.White,
    true
  );

  // check if opposing kings are adjacent to the king
  const adjacentTiles = getAdjacentTiles(board, kingTile.position);

  const adjacentOpposingKing = adjacentTiles.find((tile) => {
    return (
      tile.piece?.type === PieceType.King && tile.piece?.color !== king.color
    );
  });

  if (adjacentOpposingKing) {
    return true;
  }

  const kingPosition = {
    column: kingTile.position.column,
    row: kingTile.position.row,
  } as Position;

  return opposingValidMoves.some((move) => {
    return move.column === kingPosition.column && move.row === kingPosition.row;
  });
};

// given a board, and a color of a king,
// return if the king is in checkmate
export const isKingInCheckmate = (board: Board, color: PieceColor): boolean => {
  const kingTile = getKingPosition(board, color);

  const kingMoves = getKingMoves(board, kingTile.position);

  if (kingMoves.length > 0) {
    return false;
  }

  return isKingInCheck(board, color);
};
