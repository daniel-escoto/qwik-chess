import { Board } from "~/models/Board";
import { Piece, PieceType } from "~/models/Piece";
import { Position } from "~/models/Tile";
import { getColumnNumber } from "../Board";
import { getBishopMoves } from "./Bishop";
import { getKingMoves } from "./King";
import { getKnightMoves } from "./Knight";
import { getPawnMoves } from "./Pawn";
import { getQueenMoves } from "./Queen";
import { getRookMoves, getRookMovesHelper } from "./Rook";

export const getVerifiedPiece = (
  board: Board,
  position: Position,
  type: PieceType
): Piece | null => {
  const { piece } =
    board.tiles[position.row - 1][getColumnNumber(position.column) - 1];

  if (!piece) {
    return null;
  }

  if (piece.type !== type) {
    return null;
  }

  return piece;
};

// given a board and a tile with a piece, return all the possible moves
// for that piece
export const getPieceMoves = (board: Board, position: Position): Position[] => {
  const piece = board.tiles.flat().find((tile) => {
    return (
      tile.position.column === position.column &&
      tile.position.row === position.row
    );
  })?.piece;

  if (!piece) {
    return [];
  }

  const pieceType = piece.type;

  switch (pieceType) {
    case PieceType.Pawn:
      return getPawnMoves(board, position);
    case PieceType.Knight:
      return getKnightMoves(board, position);
    case PieceType.Bishop:
      return getBishopMoves(board, position);
    case PieceType.Rook:
      return getRookMoves(board, position);
    case PieceType.Queen:
      return getQueenMoves(board, position);
    case PieceType.King:
      return getKingMoves(board, position);
  }
};

// given a board, and the position of a piece, return the piece
export const getPiece = (board: Board, position: Position): Piece | null => {
  const column = getColumnNumber(position.column);
  const row = position.row;

  return board.tiles[row - 1][column - 1].piece;
};

// given a board, starting position, and ending position, return true if the
// move is valid, false otherwise
export const isValidMove = (
  board: Board,
  startingPosition: Position,
  endingPosition: Position
): boolean => {
  const piece = getPiece(board, startingPosition);

  if (!piece) {
    return false;
  }

  const moves = getPieceMoves(board, startingPosition);

  return moves.some((move) => {
    return (
      move.column === endingPosition.column && move.row === endingPosition.row
    );
  });
};
