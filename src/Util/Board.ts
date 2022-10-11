import { Tile } from "~/models/Tile";
import { Piece, PieceType } from "~/models/Piece";
import { Board } from "~/models/Board";

// generate a board with the starting pieces in the correct positions
export const getStartingBoard = (): Board => {
  const tiles: Tile[] = [];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const piece = getStartingPiece(x, y);
      const color = getTileColor(x, y);
      const position = { row: y, column: String.fromCharCode(97 + x) };
      tiles.push({ piece, color, position });
    }
  }
  return { tiles };
};

// given a column and row, return the color of the tile
const getTileColor = (x: number, y: number): "white" | "black" => {
  if (y % 2 === 0) {
    return x % 2 === 0 ? "white" : "black";
  } else {
    return x % 2 === 0 ? "black" : "white";
  }
};

// given a column and row, return the piece that should be there
// at the start of the game
const getStartingPiece = (x: number, y: number): Piece | null => {
  if (y === 1) {
    return { type: PieceType.Pawn, color: "black" };
  } else if (y === 6) {
    return { type: PieceType.Pawn, color: "white" };
  } else if (y === 0) {
    return getStartingPieceForBlack(x);
  } else if (y === 7) {
    return getStartingPieceForWhite(x);
  } else {
    return null;
  }
};

// given a column, return the black piece that should be there
// at the start of the game
const getStartingPieceForBlack = (x: number): Piece => {
  switch (x) {
    case 0:
    case 7:
      return { type: PieceType.Rook, color: "black" };
    case 1:
    case 6:
      return { type: PieceType.Knight, color: "black" };
    case 2:
    case 5:
      return { type: PieceType.Bishop, color: "black" };
    case 3:
      return { type: PieceType.Queen, color: "black" };
    case 4:
      return { type: PieceType.King, color: "black" };
    default:
      throw new Error("Invalid starting piece");
  }
};

// given a column, return the white piece that should be there
const getStartingPieceForWhite = (x: number): Piece => {
  switch (x) {
    case 0:
    case 7:
      return { type: PieceType.Rook, color: "white" };
    case 1:
    case 6:
      return { type: PieceType.Knight, color: "white" };
    case 2:
    case 5:
      return { type: PieceType.Bishop, color: "white" };
    case 3:
      return { type: PieceType.Queen, color: "white" };
    case 4:
      return { type: PieceType.King, color: "white" };
    default:
      throw new Error("Invalid starting piece");
  }
};

// given a pgn file, return a list of moves
export const getMovesFromPgn = (pgn: string): string[] => {
  const lines = pgn.split("\r").join("").split("\n");
  const moves = [];
  for (const line of lines) {
    if (line.startsWith("1.")) {
      const moveStrings = line.split(" ");
      for (const moveString of moveStrings) {
        if (moveString !== "1." && moveString !== "") {
          moves.push(moveString);
        }
      }
    }
  }
  return moves;
};

// given a list of moves, return a list of boards
export const getBoardsFromMoves = (moves: string[]): Board[] => {
  const boards = [];
  let board = getStartingBoard();
  boards.push(board);
  for (const move of moves) {
    board = getBoardFromMove(board, move);
    boards.push(board);
  }
  return boards;
};

// given a board and a move, return a new board
export const getBoardFromMove = (board: Board, move: string): Board => {
  const newBoard = { tiles: [...board.tiles] };
  const moveFrom = move.substring(0, 2);
  const moveTo = move.substring(2, 4);
  const tileFrom = newBoard.tiles.find(
    (tile) =>
      tile.position.column === moveFrom[0] && tile.position.row === +moveFrom[1]
  );
  const tileTo = newBoard.tiles.find(
    (tile) =>
      tile.position.column === moveTo[0] && tile.position.row === +moveTo[1]
  );
  if (tileFrom && tileTo) {
    tileTo.piece = tileFrom.piece;
    tileFrom.piece = null;
  }
  return newBoard;
};

// given a board, return a list of moves
export const getMovesFromBoard = (board: Board): string[] => {
  const moves = [];
  for (const tile of board.tiles) {
    if (tile.piece) {
      const piece = tile.piece;
      const pieceType = piece.type;
      const pieceColor = piece.color;
      const piecePosition = tile.position;
      const pieceMoves = getPieceMoves(
        board,
        pieceType,
        pieceColor,
        piecePosition
      );
      moves.push(...pieceMoves);
    }
  }
  return moves;
};

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
