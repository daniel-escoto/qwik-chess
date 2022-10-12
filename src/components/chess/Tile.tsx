import { component$, PropFunction } from "@builder.io/qwik";
import { Tile } from "~/models/Tile";
import Piece from "./Piece";
import { isSameTile } from "~/Util/Tile";

type Props = {
  tile: Tile;
  validTiles: Tile[];
  onClick$: PropFunction<(tile: Tile) => void>;
};

export function getTileColor(tile: Tile) {
  return tile.color === "white" ? "bg-white" : "bg-green-500";
}

export function getTileClass(tile: Tile, validTiles: Tile[]) {
  const tileColor = getTileColor(tile);
  const validTileClass = validTiles.some((validTile) =>
    isSameTile(validTile, tile)
  )
    ? "border-4 border-red-500"
    : "";
  return `${tileColor} ${validTileClass}`;
}

export default component$(({ tile, validTiles, onClick$ }: Props) => {
  return (
    <div
      className={`w-12 h-12 m-0 p-0 relative ${getTileClass(tile, validTiles)}`}
      onClick$={() => onClick$(tile)}
    >
      {tile.piece && <Piece color={tile.piece.color} type={tile.piece.type} />}
    </div>
  );
});
