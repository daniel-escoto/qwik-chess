import { component$, PropFunction } from "@builder.io/qwik";
import { Board } from "~/models/Board";
import { Position, Tile } from "~/models/Tile";
import Piece from "./Piece";

type Props = {
  tile: Tile;
  isSelected: boolean;
  possibleMoves: Position[];
  onClick$: PropFunction<(tile: Tile) => void>;
};

export function getTileColor(tile: Tile, isSelected: boolean) {
  if (isSelected) {
    return "bg-yellow-300";
  }

  return tile.color === "white" ? "bg-white" : "bg-green-500";
}

export function getTileClass(
  tile: Tile,
  possibleMoves: Position[],
  isSelected: boolean
) {
  const isPossibleMove = possibleMoves.some(
    (move) =>
      move.column === tile.position.column && move.row === tile.position.row
  );
  return `w-12 h-12 flex justify-center items-center ${getTileColor(
    tile,
    isSelected
  )} ${isPossibleMove ? "border-4 border-red-500" : ""}`;
}

export default component$(
  ({ tile, isSelected, possibleMoves, onClick$ }: Props) => {
    return (
      <div
        className={`w-12 h-12 m-0 p-0 relative ${getTileClass(
          tile,
          possibleMoves,
          isSelected
        )}`}
        onClick$={() => {
          onClick$(tile);
        }}
      >
        {tile.piece && (
          <Piece color={tile.piece.color} type={tile.piece.type} />
        )}
      </div>
    );
  }
);
