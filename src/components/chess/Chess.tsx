import { $, component$, useStore } from "@builder.io/qwik";
import Board from "./Board";
import { Board as BoardModel } from "~/models/Board";
import { getStartingBoard } from "~/Util/Board";
import { Tile } from "~/models/Tile";

export default component$(() => {
  const state = useStore<{
    board: BoardModel;
    selectedTile: Tile | null;
  }>({
    board: getStartingBoard(),
    selectedTile: null,
  });

  const handleTileClick$ = $((tile: Tile) => {
    const board = state.board;
    const selectedTile = state.selectedTile;
    if (selectedTile) {
      const newBoard = board;
      if (newBoard) {
        state.board = newBoard;
        state.selectedTile = null;
      } else {
        state.selectedTile = tile;
      }
    } else {
      state.selectedTile = tile;
    }
  });

  // given selected tile, return all valid moves as an array of tiles
  const getValidMoves = (tile: Tile) => {
    const board = state.board;
    const selectedTile = state.selectedTile;

    if (selectedTile) {
      const newBoard = board;

      if (newBoard) {
        return newBoard.tiles;
      }
    }
    return [];
  };

  const validTiles = state.selectedTile
    ? getValidMoves(state.selectedTile)
    : [];

  return (
    <div className="flex justify-center mt-12 h-screen">
      <Board
        board={state.board}
        validTiles={validTiles}
        handleTileClick$={handleTileClick$}
      />
    </div>
  );
});
