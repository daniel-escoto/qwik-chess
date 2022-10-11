import { component$, PropFunction } from "@builder.io/qwik";
import { Tile } from "~/models/Tile";
import Piece from "./Piece";

type Props = {
  tile: Tile;
  onClick$: PropFunction<(tile: Tile) => void>;
};

export function getTileColor(tile: Tile) {
  return tile.color === "white" ? "bg-white" : "bg-green-500";
}

export default component$(({ tile, onClick$ }: Props) => {
  return (
    <div
      className={`w-12 h-12 m-0 p-0 relative ${getTileColor(tile)}`}
      onClick$={() => onClick$(tile)}
    >
      {tile.piece && <Piece color={tile.piece.color} type={tile.piece.type} />}
    </div>
  );
});
