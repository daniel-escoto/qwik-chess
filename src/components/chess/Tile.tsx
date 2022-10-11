import { component$ } from "@builder.io/qwik";
import { Tile } from "~/models/Tile";
import Piece from "./Piece";

export function getTileColor(tile: Tile) {
  return tile.color === "white" ? "bg-white" : "bg-black";
}

export default component$((tile: Tile) => {
  return (
    <div className={`w-12 h-12 relative ${getTileColor(tile)}`}>
      {tile.piece && <Piece color={tile.piece.color} type={tile.piece.type} />}
    </div>
  );
});
