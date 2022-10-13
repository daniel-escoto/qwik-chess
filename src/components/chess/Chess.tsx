import { $, component$, useStore } from "@builder.io/qwik";
import Board from "./Board";
import { Board as BoardModel } from "~/models/Board";
import { Tile } from "~/models/Tile";
import { getPieceMoves } from "~/util/Piece/Piece";
import { generateBoard, movePiece } from "~/Util/Board";
import { PieceColor } from "~/models/Piece";

export default component$(() => {
  const state = useStore<{
    board: BoardModel;
    selectedTile: Tile | null;
    isWhitesTurn: boolean;
  }>({
    board: generateBoard(),
    selectedTile: null,
    isWhitesTurn: true,
  });

  const handleTileClick$ = $((tile: Tile) => {
    if (!state.isWhitesTurn && tile.piece?.color === PieceColor.White) {
      return;
    }

    if (state.isWhitesTurn && tile.piece?.color === PieceColor.Black) {
      return;
    }

    if (state.selectedTile && tile !== state.selectedTile) {
      const newBoard = movePiece(
        state.board,
        state.selectedTile.position,
        tile.position
      );

      // change turn only if newBoard is different from old board
      if (newBoard !== state.board) {
        state.isWhitesTurn = !state.isWhitesTurn;
      }

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
        isWhitesTurn={state.isWhitesTurn}
        handleTileClick$={handleTileClick$}
      />
    </div>
  );
});
