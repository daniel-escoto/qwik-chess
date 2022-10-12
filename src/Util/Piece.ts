import { Board } from "~/models/Board";
import { PieceType } from "~/models/Piece";
import { Position } from "~/models/Tile";
import { getColumnNumber, getColumnString } from "./Board";

// given a board and a tile with a piece, return all the possible moves
// for that piece
export const getPieceMoves = (board: Board, position: Position): Position[] => {
  const piece = board.tiles.find(
    (tile) =>
      tile.position.column === position.column &&
      tile.position.row === position.row
  )?.piece;

  if (!piece) {
    return [];
  }

  const pieceType = piece.type;
  const pieceColor = piece.color;

  switch (pieceType) {
    case PieceType.Pawn:
      return getPawnMoves(board, pieceColor, position);
    case PieceType.Knight:
      // TODO
      return [];
    case PieceType.Bishop:
      // TODO
      return [];
    case PieceType.Rook:
      // TODO
      return [];
    case PieceType.Queen:
      // TODO
      return [];
    case PieceType.King:
      // TODO
      return [];
  }
};

// given a board, a piece color, and a position of a pawn, return all the
// possible moves for that pawn
const getPawnMoves = (
  board: Board,
  pieceColor: "white" | "black",
  position: Position
): Position[] => {
  const moves: Position[] = [];

  const row = position.row;
  const newCol = position.column.charCodeAt(0) - 97;

  // if the pawn is white, it can move up one or two spaces
  if (pieceColor === "white") {
    // if the pawn is on the second row, it can move up two spaces
    if (row === 2) {
      // if the tile above and the tile two spaces above are empty, the pawn
      // can move there
      if (
        !board.tiles.find(
          (tile) =>
            tile.position.row === 3 &&
            getColumnNumber(tile.position.column) === newCol
        )?.piece &&
        !board.tiles.find(
          (tile) =>
            tile.position.row === 4 &&
            getColumnNumber(tile.position.column) === newCol
        )?.piece
      ) {
        moves.push({ row: 4, column: getColumnString(newCol) });
      }
    }

    // if the tile above is empty, the pawn can move there
    if (
      !board.tiles.find(
        (tile) =>
          tile.position.row === row + 1 &&
          getColumnNumber(tile.position.column) === newCol
      )?.piece
    ) {
      moves.push({ row: row + 1, column: getColumnString(newCol) });
    }
  }

  // if the pawn is black, it can move down one or two spaces
  if (pieceColor === "black") {
    // if the pawn is on the seventh row, it can move down two spaces
    if (row === 7) {
      // if the tile below and the tile two spaces below are empty, the pawn
      // can move there
      if (
        !board.tiles.find(
          (tile) =>
            tile.position.row === 6 &&
            getColumnNumber(tile.position.column) === newCol
        )?.piece &&
        !board.tiles.find(
          (tile) =>
            tile.position.row === 5 &&
            getColumnNumber(tile.position.column) === newCol
        )?.piece
      ) {
        moves.push({ row: 5, column: getColumnString(newCol) });
      }
    }

    // if the tile below is empty, the pawn can move there
    if (
      !board.tiles.find(
        (tile) =>
          tile.position.row === row - 1 &&
          getColumnNumber(tile.position.column) === newCol
      )?.piece
    ) {
      moves.push({ row: row - 1, column: getColumnString(newCol) });
    }
  }

  return moves;
};
