import { $, component$, useStore } from "@builder.io/qwik";
import Board from "./Board";
import { Board as BoardModel } from "~/models/Board";
import { Tile } from "~/models/Tile";
import { getPieceMoves } from "~/Util/Piece";
import { generateBoard, movePiece } from "~/Util/Board";

export default component$(() => {
  const state = useStore<{
    board: BoardModel;
    selectedTile: Tile | null;
  }>({
    board: generateBoard(),
    selectedTile: null,
  });

  const handleTileClick$ = $((tile: Tile) => {
    // if a tile is selected, move the piece and clear the selection
    // otherwise, select the tile
    if (state.selectedTile) {
      const newBoard = movePiece(
        state.board,
        state.selectedTile.position,
        tile.position
      );
      state.board = newBoard;
      state.selectedTile = null;
    } else {
      state.selectedTile = tile;
    }
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
