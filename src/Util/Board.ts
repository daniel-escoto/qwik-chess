import { Position, Tile } from "~/models/Tile";
import { Piece, PieceColor, PieceType } from "~/models/Piece";
import { Board, CheckStatus, BoardStatus } from "~/models/Board";
import { isValidMove, getPiece, getPieceMoves } from "./Piece/Piece";
import { isKingInCheck, isKingInCheckmate } from "./Piece/King";
import { getTileAtPosition, getTileOfPiece } from "./Tile";
import { getEnPassantPawn } from "./Piece/Pawn";

// generate a board with the starting pieces in the correct positions
// a - h are the columns, left to right
// 1 - 8 are the rows, bottom to top
// each tile has a color, piece, and position
export const generateBoard = (): Board => {
  const tiles: Tile[][] = [];

  for (let row = 1; row <= 8; row++) {
    const rowTiles: Tile[] = [];

    for (let column = 1; column <= 8; column++) {
      const color = (row + column) % 2 === 0 ? "white" : "black";
      const piece = getStartingPiece(row, column);
      const colString = getColumnString(column);

      rowTiles.push({
        color,
        piece,
        position: { column: colString, row },
      });
    }

    tiles.push(rowTiles);
  }

  return { tiles };
};

// given a board, generate a new copy of the board
export const cloneBoard = (board: Board): Board => {
  const tiles: Tile[][] = [];

  for (let row = 1; row <= 8; row++) {
    const rowTiles: Tile[] = [];

    for (let column = 1; column <= 8; column++) {
      const tile = getTileAtPosition(board, {
        row,
        column: getColumnString(column),
      });
      if (!tile) {
        throw new Error("Invalid board");
      }

      rowTiles.push({
        color: tile.color,
        piece: tile.piece ? { ...tile.piece } : null,
        position: { ...tile.position },
      });
    }

    tiles.push(rowTiles);
  }

  return { tiles };
};

// generate a board with with starting pieces in the correct positions
// but no pawns
export const generateBoardWithoutPawns = (): Board => {
  const tiles: Tile[][] = [];

  for (let row = 1; row <= 8; row++) {
    const rowTiles: Tile[] = [];

    if (row === 2 || row === 7) {
      for (let column = 1; column <= 8; column++) {
        const color = (row + column) % 2 === 0 ? "white" : "black";
        const colString = getColumnString(column);

        rowTiles.push({
          color,
          piece: null,
          position: { column: colString, row },
        });
      }
    } else {
      for (let column = 1; column <= 8; column++) {
        const color = (row + column) % 2 === 0 ? "white" : "black";
        const piece = getStartingPiece(row, column);
        const colString = getColumnString(column);

        rowTiles.push({
          color,
          piece,
          position: { column: colString, row },
        });
      }
    }

    tiles.push(rowTiles);
  }

  return { tiles };
};

// given a row and column, return the piece that should be there
// at the start of the game
const getStartingPiece = (y: number, x: number): Piece | null => {
  if (y === 1) {
    return getStartingPieceForWhite(x);
  } else if (y === 2) {
    return { type: PieceType.Pawn, color: PieceColor.White };
  } else if (y === 7) {
    return { type: PieceType.Pawn, color: PieceColor.Black };
  } else if (y === 8) {
    return getStartingPieceForBlack(x);
  } else {
    return null;
  }
};

// given a column, return the black piece that should be there
const getStartingPieceForBlack = (x: number): Piece => {
  switch (x) {
    case 1:
    case 8:
      return { type: PieceType.Rook, color: PieceColor.Black };
    case 2:
    case 7:
      return { type: PieceType.Knight, color: PieceColor.Black };
    case 3:
    case 6:
      return { type: PieceType.Bishop, color: PieceColor.Black };
    case 4:
      return { type: PieceType.Queen, color: PieceColor.Black };
    case 5:
      return { type: PieceType.King, color: PieceColor.Black };
    default:
      throw new Error("Invalid starting piece");
  }
};

// given a column, return the white piece that should be there
const getStartingPieceForWhite = (x: number): Piece => {
  switch (x) {
    case 1:
    case 8:
      return { type: PieceType.Rook, color: PieceColor.White };
    case 2:
    case 7:
      return { type: PieceType.Knight, color: PieceColor.White };
    case 3:
    case 6:
      return { type: PieceType.Bishop, color: PieceColor.White };
    case 4:
      return { type: PieceType.Queen, color: PieceColor.White };
    case 5:
      return { type: PieceType.King, color: PieceColor.White };
    default:
      throw new Error("Invalid starting piece");
  }
};

// given a column string, return the column number
export const getColumnNumber = (column: string): number => {
  switch (column) {
    case "a":
      return 1;
    case "b":
      return 2;
    case "c":
      return 3;
    case "d":
      return 4;
    case "e":
      return 5;
    case "f":
      return 6;
    case "g":
      return 7;
    case "h":
      return 8;
    default:
      throw new Error("Invalid column");
  }
};

// given a column number, return the column string
export const getColumnString = (column: number): string => {
  switch (column) {
    case 1:
      return "a";
    case 2:
      return "b";
    case 3:
      return "c";
    case 4:
      return "d";
    case 5:
      return "e";
    case 6:
      return "f";
    case 7:
      return "g";
    case 8:
      return "h";
    default:
      throw new Error("Invalid column");
  }
};

// given a board, a starting position, and an ending position,
// return a new board with the piece at the ending position
// if the move is valid, else return the original board
// also if a piece is captured, return the captured piece
// ensure the original board is not mutated
export const movePiece = (
  board: Board,
  start: Position,
  end: Position,
  previousEnPassant: Tile | null = null
): {
  board: Board;
  capturedPiece: Piece | null;
  enPassantTile: Tile | null;
} => {
  const newBoard = cloneBoard(board);

  const piece = getPiece(board, start);

  const enPassantTile = getEnPassantTile(board, start, end);

  if (piece && isValidMove(board, start, end, previousEnPassant)) {
    if (
      previousEnPassant &&
      end.column === previousEnPassant.position.column &&
      end.row === previousEnPassant.position.row
    ) {
      const capturedPiece = previousEnPassant
        ? getEnPassantPawn(newBoard, previousEnPassant)
        : null;

      const tileOfCapturedPiece = capturedPiece
        ? getTileOfPiece(newBoard, capturedPiece)
        : null;

      newBoard.tiles[end.row - 1][getColumnNumber(end.column) - 1].piece =
        piece;

      newBoard.tiles[start.row - 1][getColumnNumber(start.column) - 1].piece =
        null;

      if (tileOfCapturedPiece) {
        newBoard.tiles[tileOfCapturedPiece.position.row - 1][
          getColumnNumber(tileOfCapturedPiece.position.column) - 1
        ].piece = null;
      }

      return {
        board: newBoard,
        capturedPiece: capturedPiece,
        enPassantTile,
      };
    } else {
      const capturedPiece = getPiece(newBoard, end);

      newBoard.tiles[end.row - 1][getColumnNumber(end.column) - 1].piece =
        piece;
      newBoard.tiles[start.row - 1][getColumnNumber(start.column) - 1].piece =
        null;

      return { board: newBoard, capturedPiece, enPassantTile };
    }
  } else {
    return { board, capturedPiece: null, enPassantTile: null };
  }
};

// given a board, and a color, return all tiles of that color
export const getTilesOfColor = (board: Board, color: PieceColor): Tile[] => {
  const tiles: Tile[] = [];

  board.tiles.forEach((row) => {
    row.forEach((tile) => {
      if (tile.piece && tile.piece.color === color) {
        tiles.push(tile);
      }
    });
  });

  return tiles;
};

// given a board, and a color, return all tiles of that color
// that the color can move to (psuedo-legal moves)
// return {from: Position, to: Position}[]
export const getPsuedoLegalMoves = (
  board: Board,
  color: PieceColor,
  excludingKing?: boolean,
  enPassantTile: Tile | null = null
): { from: Position; to: Position }[] => {
  const moves: { from: Position; to: Position }[] = [];
  const tiles = getTilesOfColor(board, color);

  tiles.forEach((tile) => {
    const tileMoves = getPieceMoves(
      board,
      tile.position,
      excludingKing,
      enPassantTile
    );

    tileMoves.forEach((move) => {
      moves.push({ from: tile.position, to: move });
    });
  });

  return moves;
};

// given a board, and a color, return all tiles of that color
// that the color can move to (legal moves)
export const getLegalMoves = (
  board: Board,
  color: PieceColor,
  excludingKing?: boolean,
  enPassantTile: Tile | null = null
): { from: Position; to: Position }[] => {
  const moves = getPsuedoLegalMoves(board, color, excludingKing, enPassantTile);

  return moves.filter((move) => {
    const { board: newBoard } = movePiece(board, move.from, move.to);
    return !isKingInCheck(newBoard, color);
  });
};

// given a board and a color, return true if the color is in a stalemate
export const isStalemate = (board: Board, color: PieceColor): boolean => {
  return (
    getLegalMoves(board, color).length === 0 && !isKingInCheck(board, color)
  );
};

// given a board, return a check status
export const getCheckStatus = (board: Board): CheckStatus => {
  const checkStatus = {
    whiteIsInCheck: isKingInCheck(board, PieceColor.White),
    blackIsInCheck: isKingInCheck(board, PieceColor.Black),
  };

  return checkStatus;
};

// given a board, return a board status
export const getBoardStatus = (board: Board): BoardStatus => {
  if (isStalemate(board, PieceColor.White)) {
    return BoardStatus.Stalemate;
  }
  if (isStalemate(board, PieceColor.Black)) {
    return BoardStatus.Stalemate;
  }

  if (isKingInCheckmate(board, PieceColor.White)) {
    return BoardStatus.BlackWins;
  }

  if (isKingInCheckmate(board, PieceColor.Black)) {
    return BoardStatus.WhiteWins;
  }

  return BoardStatus.InPlay;
};

// given a board, a before position, and an after position,
// return an en passant tile if the move is an en passant move
// else, return null
export const getEnPassantTile = (
  beforeBoard: Board,
  beforePosition: Position,
  afterPosition: Position
): Tile | null => {
  const beforePiece = getPiece(beforeBoard, beforePosition);
  if (!beforePiece || beforePiece.type !== PieceType.Pawn) {
    return null;
  }

  // if the pawn moved two spaces, return the tile it jumped over
  if (Math.abs(beforePosition.row - afterPosition.row) === 2) {
    const row =
      beforePosition.row + (afterPosition.row - beforePosition.row) / 2;
    const column = beforePosition.column;
    return beforeBoard.tiles[row - 1][getColumnNumber(column) - 1];
  }

  return null;
};
