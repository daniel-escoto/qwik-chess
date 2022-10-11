import { component$ } from "@builder.io/qwik";
import { Board } from "~/models/Board";
import { Tile as TileModel } from "~/models/Tile";
import Tile from "./Tile";

export default component$((board: Board) => {
  const tiles = board.tiles.sort((a, b) => {
    if (a.position.y === b.position.y) {
      return a.position.x - b.position.x;
    }
    return a.position.y - b.position.y;
  });

  return (
    // have tiles right next to each other
    // 8 x 8 grid
    <div className="w-96 h-96 grid grid-cols-8 gap-0">
      {tiles.map((tile) => (
        <Tile {...tile} />
      ))}
    </div>
  );
});
