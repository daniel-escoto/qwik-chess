import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { getStartingBoard } from "~/Util/Board";
import Board from "../components/chess/Board";

export default component$(() => {
  return (
    <div className="flex justify-center mt-12 h-screen">
      <Board {...getStartingBoard()} />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik Chess",
};
