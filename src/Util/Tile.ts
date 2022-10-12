import { Tile } from "~/models/Tile";

// given two tiles, return true if they are the same tile
export const isSameTile = (tile1: Tile, tile2: Tile): boolean => {
  return (
    tile1.position.column === tile2.position.column &&
    tile1.position.row === tile2.position.row
  );
};
