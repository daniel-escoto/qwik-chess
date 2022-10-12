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
  const column = getColumnNumber(position.column);
  const row = position.row;

  const moves: Position[] = [];

  console.log("column", column);
  console.log("row", row);

  if (pieceColor === "white") {
    // if the pawn is on the first row, it can move two spaces
    if (row === 2) {
      moves.push({ column: getColumnString(column), row: row + 2 });
    }

    // the pawn can always move one space forward
    moves.push({ column: getColumnString(column), row: row + 1 });

    // the pawn can move one space diagonally if there is an enemy piece there
    const hasEnemyPieceToTheLeft = board.tiles.some(
      (tile) =>
        tile.position.column === getColumnString(column - 1) &&
        tile.position.row === row + 1 &&
        tile.piece?.color === "black"
    );
    if (hasEnemyPieceToTheLeft) {
      moves.push({ column: getColumnString(column - 1), row: row + 1 });
    }

    const hasEnemyPieceToTheRight = board.tiles.some(
      (tile) =>
        tile.position.column === getColumnString(column + 1) &&
        tile.position.row === row + 1 &&
        tile.piece?.color === "black"
    );
    if (hasEnemyPieceToTheRight) {
      moves.push({ column: getColumnString(column + 1), row: row + 1 });
    }
  } else {
    // if the pawn is on the first row, it can move two spaces
    if (row === 7) {
      moves.push({ column: getColumnString(column), row: row - 2 });
    }

    // the pawn can always move one space forward
    moves.push({ column: getColumnString(column), row: row - 1 });

    // the pawn can move one space diagonally if there is an enemy piece there
    const hasEnemyPieceToTheLeft = board.tiles.some(
      (tile) =>
        tile.position.column === getColumnString(column - 1) &&
        tile.position.row === row - 1 &&
        tile.piece?.color === "white"
    );
    if (hasEnemyPieceToTheLeft) {
      moves.push({ column: getColumnString(column - 1), row: row - 1 });
    }

    const hasEnemyPieceToTheRight = board.tiles.some(
      (tile) =>
        tile.position.column === getColumnString(column + 1) &&
        tile.position.row === row - 1 &&
        tile.piece?.color === "white"
    );
    if (hasEnemyPieceToTheRight) {
      moves.push({ column: getColumnString(column + 1), row: row - 1 });
    }
  }

  return moves;
};
