import { Tile, Position } from "~/models/Tile";
import { Board } from "~/models/Board";
import { getColumnNumber } from "./Board";

// given two tiles, return true if they are the same tile
export const isSameTile = (tile1: Tile, tile2: Tile): boolean => {
  return (
    tile1.position.column === tile2.position.column &&
    tile1.position.row === tile2.position.row
  );
};

// given a board, and a position, return the tile at that position
export const getTileAtPosition = (
  board: Board,
  position: Position
): Tile | null => {
  const row = board.tiles[position.row - 1];
  if (!row) {
    return null;
  }
  const column = getColumnNumber(position.column);
  const tile = row[column - 1];
  if (!tile) {
    return null;
  }
  return tile;
};
