import { component$ } from "@builder.io/qwik";
import { Board } from "~/models/Board";
import { Tile as TileModel } from "~/models/Tile";
import Tile from "./Tile";

export default component$((board: Board) => {
  // board tiles are one dimensional array
  return (
    <div className="grid grid-cols-8">
      {board.tiles.map((tile: TileModel, index: number) => (
        <Tile key={index} {...tile} />
      ))}
    </div>
  );
});
