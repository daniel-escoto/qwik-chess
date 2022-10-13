import { component$, PropFunction } from "@builder.io/qwik";
import { Board } from "~/models/Board";
import Tile from "./Tile";
import { Position, Tile as TileModel } from "~/models/Tile";
import ScoreBug from "./ScoreBug";
import { Piece } from "~/models/Piece";

type Props = {
  board: Board;
  possibleMoves: Position[];
  selectedTile: TileModel | null;
  isWhitesTurn: boolean;
  capturedPieces: Piece[];
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
    <div className="grid grid-cols-8 gap-0">
      {["A", "B", "C", "D", "E", "F", "G", "H"].map((letter) => (
        <div className="w-12 h-12 flex justify-center items-center">
          <span className="text-2xl">{letter}</span>
        </div>
      ))}
    </div>
  );
}

export default component$(
  ({
    board,
    possibleMoves,
    selectedTile,
    isWhitesTurn,
    capturedPieces,
    handleTileClick$,
  }: Props) => {
    // boardToRender is board.tiles.flat() upside down
    const boardTilesToRender = board.tiles.slice().reverse().flat();

    return (
      <div className="flex flex-col">
        <div className="flex mt-4">
          <RowLabels />
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-8 gap-0 w-96 h-96">
              {boardTilesToRender.flat().map((tile) => (
                <Tile
                  tile={tile}
                  possibleMoves={possibleMoves}
                  isSelected={selectedTile === tile}
                  onClick$={handleTileClick$}
                />
              ))}
            </div>
            {/* TODO: column labels */}
            <ColumnLabels />
            <div className="mt-4 w-full">
              <ScoreBug
                isWhitesTurn={isWhitesTurn}
                capturedPieces={capturedPieces}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);
