import { $, component$, useStore } from "@builder.io/qwik";
import Board from "./Board";
import { Board as BoardModel, BoardStatus } from "~/models/Board";
import { Tile } from "~/models/Tile";
import { generateBoard, movePiece, getBoardStatus } from "~/Util/Board";
import { PieceColor, Piece } from "~/models/Piece";
import { getLegalMovesFromPosition } from "~/Util/Tile";
import GameOverModal from "./GameOverModal";

export default component$(() => {
  const state = useStore<{
    board: BoardModel;
    selectedTile: Tile | null;
    isWhitesTurn: boolean;
    capturedPieces: Piece[];
    enPassantTile: Tile | null;
  }>({
    board: generateBoard(),
    selectedTile: null,
    isWhitesTurn: true,
    capturedPieces: [],
    enPassantTile: null,
  });

  const boardStatus = getBoardStatus(state.board);
  const gameIsOver = boardStatus !== BoardStatus.InPlay;

  const handleTileClick$ = $((tile: Tile) => {
    if (gameIsOver) {
      return;
    }

    if (!state.selectedTile) {
      if (!state.isWhitesTurn && tile.piece?.color === PieceColor.White) {
        return;
      }

      if (state.isWhitesTurn && tile.piece?.color === PieceColor.Black) {
        return;
      }
    }

    if (state.selectedTile && tile !== state.selectedTile) {
      const {
        board: newBoard,
        capturedPiece,
        enPassantTile,
      } = movePiece(
        state.board,
        state.selectedTile.position,
        tile.position,
        state.enPassantTile
      );

      // change turn only if newBoard is different from old board
      if (newBoard !== state.board) {
        state.isWhitesTurn = !state.isWhitesTurn;
        state.enPassantTile = enPassantTile;

        if (capturedPiece) {
          state.capturedPieces.push(capturedPiece);
        }
      }

      state.board = newBoard;
      state.selectedTile = null;
    } else {
      state.selectedTile = tile;
    }
  });

  const possibleMoves =
    state.selectedTile && state.board
      ? getLegalMovesFromPosition(
          state.board,
          state.selectedTile.position,
          state.enPassantTile
        )
      : [];

  return (
    <div className="flex justify-center mt-12 h-screen relative">
      <Board
        board={state.board}
        possibleMoves={possibleMoves}
        selectedTile={state.selectedTile}
        isWhitesTurn={state.isWhitesTurn}
        capturedPieces={state.capturedPieces}
        handleTileClick$={handleTileClick$}
      />
      <GameOverModal board={state.board} />
    </div>
  );
});
