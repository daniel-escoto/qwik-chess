import { Board } from "~/models/Board";
import { PieceColor, PieceType } from "~/models/Piece";
import { Position, Tile } from "~/models/Tile";
import { getColumnNumber, getColumnString } from "../Board";
import { getAdjacentTiles } from "../Tile";
import { getVerifiedPiece } from "./Piece";
import { getKnightMovesHelper } from "./Knight";
import { getBishopMovesHelper } from "./Bishop";
import { getRookMovesHelper } from "./Rook";

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

  // check for attacking pawns
  const rowAhead =
    king.color === PieceColor.White
      ? kingTile.position.row + 1
      : kingTile.position.row - 1;
  const leftColumn = getColumnNumber(kingTile.position.column) - 1;
  const rightColumn = getColumnNumber(kingTile.position.column) + 1;

  const leftDiagonalTile = board.tiles[rowAhead]?.[leftColumn];
  const rightDiagonalTile = board.tiles[rowAhead]?.[rightColumn];

  if (
    leftDiagonalTile?.piece?.type === PieceType.Pawn &&
    leftDiagonalTile.piece.color !== king.color
  ) {
    return true;
  }

  if (
    rightDiagonalTile?.piece?.type === PieceType.Pawn &&
    rightDiagonalTile.piece.color !== king.color
  ) {
    return true;
  }

  // check for attacking knights
  const knightPositions = getKnightMovesHelper(board, kingTile.position);

  const knightAttackingKing = knightPositions.find((position) => {
    const tile = board.tiles[position.row]?.[getColumnNumber(position.column)];
    return (
      tile?.piece?.type === PieceType.Knight && tile.piece.color !== king.color
    );
  });

  if (knightAttackingKing) {
    return true;
  }

  // check for attacking bishops
  const bishopPositions = getBishopMovesHelper(board, kingTile.position);

  const bishopAttackingKing = bishopPositions.find((position) => {
    const tile = board.tiles[position.row]?.[getColumnNumber(position.column)];
    return (
      tile?.piece?.type === PieceType.Bishop && tile.piece.color !== king.color
    );
  });

  if (bishopAttackingKing) {
    return true;
  }

  // check for attacking rooks
  const rookPositions = getRookMovesHelper(board, kingTile.position);

  const rookAttackingKing = rookPositions.find((position) => {
    const tile = board.tiles[position.row]?.[getColumnNumber(position.column)];
    return (
      tile?.piece?.type === PieceType.Rook && tile.piece.color !== king.color
    );
  });

  if (rookAttackingKing) {
    return true;
  }

  // check for attacking queens
  const queenPositions = [...bishopPositions, ...rookPositions];

  const queenAttackingKing = queenPositions.find((position) => {
    const tile = board.tiles[position.row]?.[getColumnNumber(position.column)];
    return (
      tile?.piece?.type === PieceType.Queen && tile.piece.color !== king.color
    );
  });

  if (queenAttackingKing) {
    return true;
  }

  return false;
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
