export enum PieceType {
  Pawn = "Pawn",
  Rook = "Rook",
  Knight = "Knight",
  Bishop = "Bishop",
  Queen = "Queen",
  King = "King",
}

export enum PieceColor {
  White = "White",
  Black = "Black",
}

export type Piece = {
  type: PieceType;
  color: PieceColor;
};
