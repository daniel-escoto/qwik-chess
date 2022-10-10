import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { getStartingBoard } from "~/Util/Board";
import Board from "../components/chess/Board";

export default component$(() => {
  return (
    <div className="mx-auto max-w-7xl">
      <Board {...getStartingBoard()} />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik Chess",
};
