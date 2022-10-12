import { component$, PropFunction } from "@builder.io/qwik";
import { Board } from "~/models/Board";
import Tile from "./Tile";
import { Tile as TileModel } from "~/models/Tile";

type Props = {
  board: Board;
  validTiles: TileModel[];
  handleTileClick$: PropFunction<(tile: TileModel) => void>;
};

export function RowLabel({ row }: { row: number }) {
  return (
    <div className="w-12 h-12 flex justify-center items-center">
      <span className="text-2xl">{row + 1}</span>
    </div>
  );
}

export function RowLabels() {
  return (
    <div className="flex flex-col">
      {[7, 6, 5, 4, 3, 2, 1, 0].map((row) => (
        <RowLabel row={row} />
      ))}
    </div>
  );
}

export function ColumnLabels() {
  return (
    <div className="grid grid-cols-9 gap-0">
      <div className="w-12 h-12" />
      {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
        <div className="w-12 h-12 flex justify-center items-center">
          <span className="text-2xl">{letter}</span>
        </div>
      ))}
    </div>
  );
}

export default component$(({ board, validTiles, handleTileClick$ }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex mt-4">
        <RowLabels />
        <div className="grid grid-cols-8 gap-0 w-96 h-96">
          {board.tiles.map((tile) => (
            <Tile
              tile={tile}
              validTiles={validTiles}
              onClick$={handleTileClick$}
            />
          ))}
        </div>
      </div>

      <ColumnLabels />
    </div>
  );
});
