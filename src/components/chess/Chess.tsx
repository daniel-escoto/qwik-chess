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

  // given selected tile, return all valid moves as an array of tiles
  const getValidMoves = (tile: Tile) => {
    const board = state.board;
    const validMoves = [];
    for (let i = 0; i < board.tiles.length; i++) {
      const newBoard = getValidMove(
        board,
        tile.position,
        board.tiles[i].position
      );
      if (newBoard) {
        validMoves.push(board.tiles[i]);
      }
    }
    return validMoves;
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
