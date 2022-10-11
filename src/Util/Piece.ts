import { Board } from "~/models/Board";
import { PieceType } from "~/models/Piece";

// given a board, a piece type, and a piece position, return a list of moves
export const getPieceMoves = (
  board: Board,
  pieceType: PieceType,
  pieceColor: "white" | "black",
  piecePosition: { row: number; column: string }
): string[] => {
  const moves = [];
  switch (pieceType) {
    case PieceType.Pawn:
      moves.push(...getPawnMoves(board, pieceColor, piecePosition));
      break;
    case PieceType.Knight:
      moves.push(...getKnightMoves(board, piecePosition));
      break;
    case PieceType.Bishop:
      moves.push(...getBishopMoves(board, piecePosition));
      break;
    case PieceType.Rook:
      moves.push(...getRookMoves(board, piecePosition));
      break;
    case PieceType.Queen:
      moves.push(...getQueenMoves(board, piecePosition));
      break;
    case PieceType.King:
      moves.push(...getKingMoves(board, piecePosition));
      break;
  }
  return moves;
};

// given a board, and a piece position, return a list of pawn moves
export const getPawnMoves = (
  board: Board,
  pieceColor: "white" | "black",
  piecePosition: { row: number; column: string }
): string[] => {
  const moves = [];
  const row = piecePosition.row;
  const column = piecePosition.column;
  const tile = board.tiles.find(
    (tile) => tile.position.column === column && tile.position.row === row
  );
  if (tile) {
    const piece = tile.piece;
    if (piece) {
      const pieceType = piece.type;
      if (pieceType === PieceType.Pawn) {
        if (pieceColor === "white") {
          const tileTo = board.tiles.find(
            (tile) =>
              tile.position.column === column && tile.position.row === row + 1
          );
          if (tileTo && !tileTo.piece) {
            moves.push(`${column}${row}${column}${row + 1}`);
          }
        } else {
          const tileTo = board.tiles.find(
            (tile) =>
              tile.position.column === column && tile.position.row === row - 1
          );
          if (tileTo && !tileTo.piece) {
            moves.push(`${column}${row}${column}${row - 1}`);
          }
        }
      }
    }
  }
  return moves;
};

// given a board, and a piece position, return a list of knight moves
export const getKnightMoves = (
  board: Board,
  piecePosition: { row: number; column: string }
): string[] => {
  const moves = [];
  const row = piecePosition.row;
  const column = piecePosition.column;
  const tile = board.tiles.find(
    (tile) => tile.position.column === column && tile.position.row === row
  );
  if (tile) {
    const piece = tile.piece;
    if (piece) {
      const pieceType = piece.type;
      if (pieceType === PieceType.Knight) {
        const tileTo = board.tiles.find(
          (tile) =>
            tile.position.column === column && tile.position.row === row + 2
        );
        if (tileTo && !tileTo.piece) {
          moves.push(`${column}${row}${column}${row + 2}`);
        }
      }
    }
  }
  return moves;
};

// given a board, and a piece position, return a list of bishop moves
export const getBishopMoves = (
  board: Board,
  piecePosition: { row: number; column: string }
): string[] => {
  const moves = [];
  const row = piecePosition.row;
  const column = piecePosition.column;
  const tile = board.tiles.find(
    (tile) => tile.position.column === column && tile.position.row === row
  );
  if (tile) {
    const piece = tile.piece;
    if (piece) {
      const pieceType = piece.type;
      if (pieceType === PieceType.Bishop) {
        const tileTo = board.tiles.find(
          (tile) =>
            tile.position.column === column && tile.position.row === row + 2
        );
        if (tileTo && !tileTo.piece) {
          moves.push(`${column}${row}${column}${row + 2}`);
        }
      }
    }
  }
  return moves;
};

// given a board, and a piece position, return a list of rook moves
export const getRookMoves = (
  board: Board,
  piecePosition: { row: number; column: string }
): string[] => {
  const moves = [];
  const row = piecePosition.row;
  const column = piecePosition.column;
  const tile = board.tiles.find(
    (tile) => tile.position.column === column && tile.position.row === row
  );
  if (tile) {
    const piece = tile.piece;
    if (piece) {
      const pieceType = piece.type;
      if (pieceType === PieceType.Rook) {
        const tileTo = board.tiles.find(
          (tile) =>
            tile.position.column === column && tile.position.row === row + 2
        );
        if (tileTo && !tileTo.piece) {
          moves.push(`${column}${row}${column}${row + 2}`);
        }
      }
    }
  }
  return moves;
};

// queen
// given a board, and a piece position, return a list of queen moves
export const getQueenMoves = (
  board: Board,
  piecePosition: { row: number; column: string }
): string[] => {
  const moves = [];
  const row = piecePosition.row;
  const column = piecePosition.column;
  const tile = board.tiles.find(
    (tile) => tile.position.column === column && tile.position.row === row
  );
  if (tile) {
    const piece = tile.piece;
    if (piece) {
      const pieceType = piece.type;
      if (pieceType === PieceType.Queen) {
        const tileTo = board.tiles.find(
          (tile) =>
            tile.position.column === column && tile.position.row === row + 2
        );
        if (tileTo && !tileTo.piece) {
          moves.push(`${column}${row}${column}${row + 2}`);
        }
      }
    }
  }
  return moves;
};

// given a board, and a piece position, return a list of king moves
export const getKingMoves = (
  board: Board,
  piecePosition: { row: number; column: string }
): string[] => {
  const moves = [];
  const row = piecePosition.row;
  const column = piecePosition.column;
  const tile = board.tiles.find(
    (tile) => tile.position.column === column && tile.position.row === row
  );
  if (tile) {
    const piece = tile.piece;
    if (piece) {
      const pieceType = piece.type;
      if (pieceType === PieceType.King) {
        const tileTo = board.tiles.find(
          (tile) =>
            tile.position.column === column && tile.position.row === row + 2
        );
        if (tileTo && !tileTo.piece) {
          moves.push(`${column}${row}${column}${row + 2}`);
        }
      }
    }
  }
  return moves;
};
