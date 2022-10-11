import { component$, useStore } from "@builder.io/qwik";
import Board from "./Board";
import { Board as BoardModel } from "~/models/Board";
import { getStartingBoard } from "~/Util/Board";
import { Piece } from "~/models/Piece";

export default component$(function () {
  const state = useStore<{
    board: BoardModel;
    selectedPiece: Piece | null;
  }>({
    board: getStartingBoard(),
    selectedPiece: null,
  });

  return (
    <div className="flex justify-center mt-12 h-screen">
      <Board {...state.board} />
    </div>
  );
});
