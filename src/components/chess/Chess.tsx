import { $, component$, useStore } from "@builder.io/qwik";
import Board from "./Board";
import { Board as BoardModel } from "~/models/Board";
import { getStartingBoard, getValidMove } from "~/Util/Board";
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
      const newBoard = getValidMove(
        board,
        selectedTile.position,
        tile.position
      );
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

  return (
    <div className="flex justify-center mt-12 h-screen">
      <Board board={state.board} handleTileClick$={handleTileClick$} />
    </div>
  );
});
