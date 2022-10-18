import { Tile } from "./Tile";

export type Board = {
  tiles: Tile[][];
};

export type CheckStatus = {
  whiteIsInCheck: boolean;
  blackIsInCheck: boolean;
};

export enum BoardStatus {
  InPlay = "InPlay",
  Stalemate = "Stalemate",
  WhiteWins = "WhiteWins",
  BlackWins = "BlackWins",
}
