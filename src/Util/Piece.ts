import { Board } from "~/models/Board";
import { Piece, PieceType } from "~/models/Piece";
import { Position } from "~/models/Tile";
import { getColumnNumber, getColumnString } from "./Board";

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

// given a board, a piece color, and a position of a pawn, return all the
// possible moves for that pawn
const getPawnMoves = (board: Board, position: Position): Position[] => {
  const column = getColumnNumber(position.column); // 1-8
  const row = position.row; // 1-8

  const tiles = board.tiles.flat();

  const moves: Position[] = [];

  const piece = getVerifiedPiece(board, position, PieceType.Pawn);

  if (!piece) {
    return [];
  }

  const pieceColor = piece.color;

  if (pieceColor === "white") {
    // check if the pawn is on the last row
    if (row === 8) {
      return [];
    }

    // check if the pawn can move forward 1 space
    const forwardOneSpace = tiles.find((tile) => {
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
      const forwardTwoSpaces = tiles.find((tile) => {
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
      const rightOneSpace = tiles.find((tile) => {
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
      const leftOneSpace = tiles.find((tile) => {
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
    const forwardOneSpace = tiles.find((tile) => {
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
      const forwardTwoSpaces = tiles.find((tile) => {
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
      const rightOneSpace = tiles.find((tile) => {
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
      const leftOneSpace = tiles.find((tile) => {
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
  const column = getColumnNumber(position.column); // 1-8
  const row = position.row; // 1-8

  const tiles = board.tiles.flat();

  const moves: Position[] = [];

  const piece = getVerifiedPiece(board, position, PieceType.Knight);

  if (!piece) {
    return [];
  }

  const pieceColor = piece.color;

  const possibleMoves = [
    { column: column + 2, row: row + 1 },
    { column: column + 2, row: row - 1 },
    { column: column - 2, row: row + 1 },
    { column: column - 2, row: row - 1 },
    { column: column + 1, row: row + 2 },
    { column: column + 1, row: row - 2 },
    { column: column - 1, row: row + 2 },
    { column: column - 1, row: row - 2 },
  ];

  possibleMoves.forEach((move) => {
    if (move.column > 0 && move.column < 9 && move.row > 0 && move.row < 9) {
      const tile = tiles.find((tile) => {
        return (
          tile.position.column === getColumnString(move.column) &&
          tile.position.row === move.row
        );
      });

      if (!tile) {
        return;
      }

      if (!tile.piece) {
        moves.push({ column: getColumnString(move.column), row: move.row });
      } else if (tile.piece.color !== pieceColor) {
        moves.push({ column: getColumnString(move.column), row: move.row });
      }
    }
  });

  return moves;
};

// helper for getBishopMoves and getQueenMoves
const getBishopMovesHelper = (board: Board, position: Position): Position[] => {
  const column = getColumnNumber(position.column); // 1-8
  const row = position.row; // 1-8

  const pieceColor = board.tiles[row - 1][column - 1].piece?.color;

  const tiles = board.tiles.flat();

  const moves: Position[] = [];
  const directions = [
    { column: 1, row: 1 },
    { column: 1, row: -1 },
    { column: -1, row: 1 },
    { column: -1, row: -1 },
  ];

  directions.forEach((direction) => {
    let currentColumn = column;
    let currentRow = row;

    while (true) {
      currentColumn += direction.column;
      currentRow += direction.row;

      if (
        currentColumn < 1 ||
        currentColumn > 8 ||
        currentRow < 1 ||
        currentRow > 8
      ) {
        break;
      }

      const tile = tiles.find((tile) => {
        return (
          tile.position.column === getColumnString(currentColumn) &&
          tile.position.row === currentRow
        );
      });

      if (!tile) {
        break;
      }

      if (!tile.piece) {
        moves.push({ column: getColumnString(currentColumn), row: currentRow });
      } else if (tile.piece.color !== pieceColor) {
        moves.push({ column: getColumnString(currentColumn), row: currentRow });
        break;
      } else {
        break;
      }
    }
  });

  return moves;
};

// given a board, and a position of a bishop, return all the possible moves
// for that bishop
const getBishopMoves = (board: Board, position: Position): Position[] => {
  const piece = getVerifiedPiece(board, position, PieceType.Bishop);

  if (!piece) {
    return [];
  }

  return getBishopMovesHelper(board, position);
};

// helper for getRookMoves and getQueenMoves
const getRookMovesHelper = (board: Board, position: Position): Position[] => {
  const column = getColumnNumber(position.column); // 1-8
  const row = position.row; // 1-8

  const pieceColor = board.tiles[row - 1][column - 1].piece?.color;

  const tiles = board.tiles.flat();

  const moves: Position[] = [];

  const directions = [
    { column: 1, row: 0 },
    { column: -1, row: 0 },
    { column: 0, row: 1 },
    { column: 0, row: -1 },
  ];

  directions.forEach((direction) => {
    let currentColumn = column;
    let currentRow = row;

    while (true) {
      currentColumn += direction.column;
      currentRow += direction.row;

      if (currentColumn < 1 || currentColumn > 8) {
        break;
      }

      if (currentRow < 1 || currentRow > 8) {
        break;
      }

      const tile = tiles.find((tile) => {
        return (
          tile.position.column === getColumnString(currentColumn) &&
          tile.position.row === currentRow
        );
      });

      if (!tile) {
        break;
      }

      if (!tile.piece) {
        moves.push({
          column: getColumnString(currentColumn),
          row: currentRow,
        });
      } else if (tile.piece.color !== pieceColor) {
        moves.push({
          column: getColumnString(currentColumn),
          row: currentRow,
        });
        break;
      } else {
        break;
      }
    }
  });

  return moves;
};

// given a board, and a position of a rook, return all the possible moves
// for that rook
const getRookMoves = (board: Board, position: Position): Position[] => {
  const piece = getVerifiedPiece(board, position, PieceType.Rook);

  if (!piece) {
    return [];
  }

  return getRookMovesHelper(board, position);
};

// given a board, and a position of a queen, return all the possible moves
// for that queen
const getQueenMoves = (board: Board, position: Position): Position[] => {
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

// given a board, and a position of a king, return all the possible moves
// for that king
const getKingMoves = (board: Board, position: Position): Position[] => {
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
