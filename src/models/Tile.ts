import { Piece } from "./Piece";

export type Position = {
  x: number;
  y: number;
};

export type Tile = {
  piece: Piece | null;
  color: "white" | "black";
  position: Position;
};
