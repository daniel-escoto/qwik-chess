import { component$ } from "@builder.io/qwik";

interface Props {
  isWhitesTurn: boolean;
}

export const BlackIndicator = component$(() => {
  return <div className="w-8 h-8 rounded-full border border-white bg-black" />;
});

export const WhiteIndicator = component$(() => {
  return <div className="w-8 h-8 rounded-full border border-black bg-white" />;
});

export default component$(({ isWhitesTurn }: Props) => {
  const isSelectedClass = "font-bold";
  const isNotSelectedClass = "text-gray-500";

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <WhiteIndicator />
        <span className={isWhitesTurn ? isSelectedClass : isNotSelectedClass}>
          White
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className={isWhitesTurn ? isNotSelectedClass : isSelectedClass}>
          Black
        </span>
        <BlackIndicator />
      </div>
    </div>
  );
});
