import { component$, PropFunction } from "@builder.io/qwik";
import { Board } from "~/models/Board";
import Tile from "./Tile";
import { Tile as TileModel } from "~/models/Tile";

type Props = {
  board: Board;
  handleTileClick$: PropFunction<(tile: TileModel) => void>;
};

export function RowLabel({ row }: { row: number }) {
  return (
    <div className="w-12 h-12 flex justify-center items-center">
      <span className="text-2xl">{row + 1}</span>
    </div>
  );
}

// row labels
// from top to bottom
// 8 7 6 5 4 3 2 1
export function RowLabels() {
  return (
    <div className="flex flex-col">
      <RowLabel row={7} />
      <RowLabel row={6} />
      <RowLabel row={5} />
      <RowLabel row={4} />
      <RowLabel row={3} />
      <RowLabel row={2} />
      <RowLabel row={1} />
      <RowLabel row={0} />
    </div>
  );
}

export function ColumnLabels() {
  return (
    <div className="grid grid-cols-9  w-96 h-96 gap-0">
      <div className="w-12 h-12" />
      {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
        <div className="w-12 h-12 flex justify-center items-center">
          <span className="text-2xl">{letter}</span>
        </div>
      ))}
    </div>
  );
}

export default component$(({ board, handleTileClick$ }: Props) => {
  //   return (
  //     <div className="grid grid-cols-8 gap-0 w-96 h-96">
  //       {board.tiles.map((tile) => (
  //         <Tile tile={tile} onClick$={handleTileClick$} />
  //       ))}
  //     </div>
  //   );

  return (
    <div className="flex items-center">
      <RowLabels />
      <div className="grid grid-cols-8 gap-0 w-96 h-96">
        {board.tiles.map((tile) => (
          <Tile tile={tile} onClick$={handleTileClick$} />
        ))}
      </div>
    </div>
  );
});
