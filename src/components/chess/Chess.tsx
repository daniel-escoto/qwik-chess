import { $, component$, useStore } from "@builder.io/qwik";
import Board from "./Board";
import { Board as BoardModel } from "~/models/Board";
import { Tile } from "~/models/Tile";
import { getPieceMoves } from "~/Util/Piece";
import { generateBoard } from "~/Util/Board";

export default component$(() => {
  const state = useStore<{
    board: BoardModel;
    selectedTile: Tile | null;
  }>({
    board: generateBoard(),
    selectedTile: null,
  });

  const handleTileClick$ = $((tile: Tile) => {
    // set selected tile to null if the clicked tile is already selected
    if (state.selectedTile === tile) {
      state.selectedTile = null;
      return;
    }

    state.selectedTile = tile;
  });

  const possibleMoves =
    state.selectedTile && state.board
      ? getPieceMoves(state.board, state.selectedTile.position)
      : [];

  return (
    <div className="flex justify-center mt-12 h-screen">
      <Board
        board={state.board}
        possibleMoves={possibleMoves}
        selectedTile={state.selectedTile}
        handleTileClick$={handleTileClick$}
      />
    </div>
  );
});
