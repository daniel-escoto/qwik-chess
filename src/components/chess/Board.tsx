import { $, component$, PropFunction, useStore } from "@builder.io/qwik";
import { Board } from "~/models/Board";
import Tile from "./Tile";
import { Position, Tile as TileModel } from "~/models/Tile";
import ScoreBug from "./ScoreBug";
import { Piece, PieceColor } from "~/models/Piece";

type Props = {
  board: Board;
  possibleMoves: Position[];
  selectedTile: TileModel | null;
  isWhitesTurn: boolean;
  capturedPieces: Piece[];
  handleTileClick$: PropFunction<(tile: TileModel) => void>;
};

type BoardState = {
  displaySide: PieceColor;
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
    const state = useStore<BoardState>({ displaySide: PieceColor.White });

    const toggleDisplaySide$ = $(() => {
      const newSide =
        state.displaySide === PieceColor.White
          ? PieceColor.Black
          : PieceColor.White;

      state.displaySide = newSide;
    });

    const boardTilesToRender = board.tiles.slice().reverse().flat();

    return (
      <div className="flex flex-col mt-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              onClick$={() => {
                window.location.reload();
              }}
            >
              <span>New Game</span>
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
              onClick$={toggleDisplaySide$}
            >
              <span>Flip Board</span>
            </button>
          </div>
        </div>
        <div className="flex">
          <RowLabels />
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-8 gap-0 w-96 h-96">
              {boardTilesToRender.map((tile, index) => (
                <Tile
                  key={index}
                  tile={tile}
                  possibleMoves={possibleMoves}
                  isSelected={selectedTile === tile}
                  onClick$={handleTileClick$}
                />
              ))}
            </div>
            <ColumnLabels />
            <div className="mt-4 w-full">
              <ScoreBug
                board={board}
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
