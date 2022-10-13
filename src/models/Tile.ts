import { Piece } from "./Piece";

export type Position = {
  row: number;
  column: string;
};

export type Tile = {
  piece: Piece | null;
  color: "white" | "black";
  position: Position;
};
