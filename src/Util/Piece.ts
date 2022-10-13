import { Board } from "~/models/Board";
import { PieceType } from "~/models/Piece";
import { Position } from "~/models/Tile";
import { getColumnNumber, getColumnString } from "./Board";

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
  const pieceColor = piece.color;

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

// given a board, a piece color, and a position of a pawn, return all the
// possible moves for that pawn
const getPawnMoves = (board: Board, position: Position): Position[] => {
  // if the pawn is white, then it can move up
  // if the pawn is black, then it can move down
  // if the pawn is on the starting row, then it can move 2 spaces
  // otherwise, it can only move 1 space
  // if the pawn is on the last row, then it cannot move forward
  // if the pawn is on the first column, then it cannot move left
  // if the pawn is on the last column, then it cannot move right
  // a pawn can capture diagonally

  const column = getColumnNumber(position.column); // 1-8
  const row = position.row; // 1-8

  const moves: Position[] = [];

  // check if the board with given position has a pawn
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
  const pieceColor = piece.color;

  if (pieceType !== PieceType.Pawn) {
    return [];
  }

  if (pieceColor === "white") {
    // check if the pawn is on the last row
    if (row === 8) {
      return [];
    }

    // check if the pawn can move forward 1 space
    const forwardOneSpace = board.tiles.flat().find((tile) => {
      return (
        tile.position.column === position.column &&
        tile.position.row === row + 1
      );
    });

    if (!forwardOneSpace) {
      return [];
    }

    if (!forwardOneSpace.piece) {
      moves.push({ column: position.column, row: row + 1 });
    }

    // check if the pawn can move forward 2 spaces
    if (row === 2) {
      const forwardTwoSpaces = board.tiles.flat().find((tile) => {
        return (
          tile.position.column === position.column &&
          tile.position.row === row + 2
        );
      });

      if (!forwardTwoSpaces) {
        return [];
      }

      if (!forwardTwoSpaces.piece) {
        moves.push({ column: position.column, row: row + 2 });
      }
    }

    // check if the pawn can move right 1 space
    if (column < 8) {
      const rightOneSpace = board.tiles.flat().find((tile) => {
        return (
          tile.position.column === getColumnString(column + 1) &&
          tile.position.row === row + 1
        );
      });

      if (!rightOneSpace) {
        return [];
      }

      if (rightOneSpace.piece) {
        moves.push({
          column: getColumnString(column + 1),
          row: row + 1,
        });
      }
    }

    // check if the pawn can move left 1 space
    if (column > 1) {
      const leftOneSpace = board.tiles.flat().find((tile) => {
        return (
          tile.position.column === getColumnString(column - 1) &&
          tile.position.row === row + 1
        );
      });

      if (!leftOneSpace) {
        return [];
      }

      if (leftOneSpace.piece) {
        moves.push({
          column: getColumnString(column - 1),
          row: row + 1,
        });
      }
    }
  } else {
    // check if the pawn is on the first row
    if (row === 1) {
      return [];
    }

    // check if the pawn can move forward 1 space
    const forwardOneSpace = board.tiles.flat().find((tile) => {
      return (
        tile.position.column === position.column &&
        tile.position.row === row - 1
      );
    });

    if (!forwardOneSpace) {
      return [];
    }

    if (!forwardOneSpace.piece) {
      moves.push({ column: position.column, row: row - 1 });
    }

    // check if the pawn can move forward 2 spaces
    if (row === 7) {
      const forwardTwoSpaces = board.tiles.flat().find((tile) => {
        return (
          tile.position.column === position.column &&
          tile.position.row === row - 2
        );
      });

      if (!forwardTwoSpaces) {
        return [];
      }

      if (!forwardTwoSpaces.piece) {
        moves.push({ column: position.column, row: row - 2 });
      }
    }

    // check if the pawn can move right 1 space
    if (column < 8) {
      const rightOneSpace = board.tiles.flat().find((tile) => {
        return (
          tile.position.column === getColumnString(column + 1) &&
          tile.position.row === row - 1
        );
      });

      if (!rightOneSpace) {
        return [];
      }

      if (rightOneSpace.piece) {
        moves.push({
          column: getColumnString(column + 1),
          row: row - 1,
        });
      }
    }

    // check if the pawn can move left 1 space
    if (column > 1) {
      const leftOneSpace = board.tiles.flat().find((tile) => {
        return (
          tile.position.column === getColumnString(column - 1) &&
          tile.position.row === row - 1
        );
      });

      if (!leftOneSpace) {
        return [];
      }

      if (leftOneSpace.piece) {
        moves.push({
          column: getColumnString(column - 1),
          row: row - 1,
        });
      }
    }
  }

  return moves;
};

// given a board, and a position of a knight, return all the possible moves
// for that knight
const getKnightMoves = (board: Board, position: Position): Position[] => {
  // TODO: fix
  return [];
};

// given a board, and a position of a bishop, return all the possible moves
// for that bishop
const getBishopMoves = (board: Board, position: Position): Position[] => {
  const column = getColumnNumber(position.column);
  const row = position.row;

  const moves: Position[] = [];

  // TODO

  return moves;
};

// given a board, and a position of a rook, return all the possible moves
// for that rook
const getRookMoves = (board: Board, position: Position): Position[] => {
  const column = getColumnNumber(position.column);
  const row = position.row;

  const moves: Position[] = [];

  // TODO

  return moves;
};

// given a board, and a position of a queen, return all the possible moves
// for that queen
const getQueenMoves = (board: Board, position: Position): Position[] => {
  const column = getColumnNumber(position.column);
  const row = position.row;

  const moves: Position[] = [];

  // TODO

  return moves;
};

// given a board, and a position of a king, return all the possible moves
// for that king
const getKingMoves = (board: Board, position: Position): Position[] => {
  const column = getColumnNumber(position.column);
  const row = position.row;

  const moves: Position[] = [];

  // TODO

  return moves;
};
