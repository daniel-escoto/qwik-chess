import { Board } from "~/models/Board";
import { PieceType } from "~/models/Piece";
import { Position } from "~/models/Tile";
import { getBishopMovesHelper } from "./Bishop";
import { getVerifiedPiece } from "./Piece";
import { getRookMovesHelper } from "./Rook";

// given a board, and a position of a queen, return all the possible moves
// for that queen
export const getQueenMoves = (board: Board, position: Position): Position[] => {
  const piece = getVerifiedPiece(board, position, PieceType.Queen);

  if (!piece) {
    return [];
  }

  // queen can move like a rook and a bishop
  return [
    ...getRookMovesHelper(board, position),
    ...getBishopMovesHelper(board, position),
  ];
};
