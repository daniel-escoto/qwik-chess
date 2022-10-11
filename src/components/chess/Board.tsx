import { component$ } from "@builder.io/qwik";
import { Board } from "~/models/Board";
import Tile from "./Tile";

export function RowLabel({ row }: { row: number }) {
  return (
    <div className="w-12 h-12 flex justify-center items-center">
      <span className="text-2xl">{row + 1}</span>
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

export default component$((board: Board) => {
  return (
    <div className="grid grid-cols-9 w-96 h-96 gap-0">
      {board.tiles.map((tile, index) => {
        if (index % 8 === 0) {
          return (
            <>
              <RowLabel row={8 - Math.floor(index / 8) - 1} />
              <Tile {...tile} />
            </>
          );
        }
        return <Tile {...tile} />;
      })}
      <ColumnLabels />
    </div>
  );
});
