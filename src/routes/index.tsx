import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return <div className="mx-auto max-w-7xl"></div>;
});

export const head: DocumentHead = {
  title: "Qwik Chess",
};
