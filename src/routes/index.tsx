import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Chess from "~/components/chess/Chess";
import { getStartingBoard } from "~/Util/Board";
import Board from "../components/chess/Board";

export default component$(() => {
  return <Chess />;
});

export const head: DocumentHead = {
  title: "Qwik Chess",
};
