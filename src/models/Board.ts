import { Tile } from "./Tile";

export type Board = {
  tiles: Tile[][];
};

export type CheckStatus = {
  whiteIsInCheck: boolean;
  blackIsInCheck: boolean;
};
