export enum PieceType {
  Pawn = "Pawn",
  Rook = "Rook",
  Knight = "Knight",
  Bishop = "Bishop",
  Queen = "Queen",
  King = "King",
}

export type Piece = {
  type: PieceType;
  color: "white" | "black";
};
