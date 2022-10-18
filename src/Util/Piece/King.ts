import { Board } from "~/models/Board";
import { PieceColor, PieceType } from "~/models/Piece";
import { Position, Tile } from "~/models/Tile";
import { getColumnNumber, getColumnString, getTilesOfColor } from "../Board";
import { getVerifiedPiece, getPieceMoves } from "./Piece";

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

  const opposingTiles = getTilesOfColor(
    board,
    color === PieceColor.White ? PieceColor.Black : PieceColor.White
  );

  const opposingMoves = opposingTiles.flatMap((tile) => {
    return getPieceMoves(board, tile.position);
  });

  const isInCheck = opposingMoves.some((move) => {
    return (
      move.column === kingTile.position.column &&
      move.row === kingTile.position.row
    );
  });

  return isInCheck;
};

// given a board, and a color of a king,
// return if the king is in checkmate
export const isKingInCheckmate = (board: Board, color: PieceColor): boolean => {
  const kingTile = getKingPosition(board, color);

  const kingMoves = getKingMoves(board, kingTile.position);

  const opposingTiles = getTilesOfColor(
    board,
    color === PieceColor.White ? PieceColor.Black : PieceColor.White
  );

  const opposingMoves = opposingTiles.flatMap((tile) => {
    return getPieceMoves(board, tile.position);
  });

  // get king moves that dont overlap with opposing moves
  const kingMovesThatDontOverlap = kingMoves.filter((kingMove) => {
    return !opposingMoves.some((opposingMove) => {
      return (
        opposingMove.column === kingMove.column &&
        opposingMove.row === kingMove.row
      );
    });
  });

  if (kingMovesThatDontOverlap.length > 0) {
    return false;
  }

  const isInCheckMate = isKingInCheck(board, color);

  return isInCheckMate;
};
