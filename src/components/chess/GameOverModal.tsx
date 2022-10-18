import { component$, useMount$ } from "@builder.io/qwik";
import { Board, BoardStatus } from "~/models/Board";
import { getBoardStatus } from "~/Util/Board";

interface Props {
  board: Board;
}

export default component$(({ board }: Props) => {
  const boardStatus = getBoardStatus(board);

  if (boardStatus === BoardStatus.InPlay) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">
          {boardStatus === BoardStatus.WhiteWins
            ? "White Wins!"
            : "Black Wins!"}
        </h1>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick$={() => {
            window.location.reload();
          }}
        >
          <span>New Game</span>
        </button>
      </div>
    </div>
  );
});
