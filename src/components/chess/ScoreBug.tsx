import { component$ } from "@builder.io/qwik";
import { Piece as PieceModel, PieceColor } from "~/models/Piece";
import Piece from "./Piece";

interface Props {
  isWhitesTurn: boolean;
  capturedPieces: PieceModel[];
}

export const BlackIndicator = component$(() => {
  return <div className="w-8 h-8 rounded-full border border-white bg-black" />;
});

export const WhiteIndicator = component$(() => {
  return <div className="w-8 h-8 rounded-full border border-black bg-white" />;
});

export default component$(({ isWhitesTurn, capturedPieces }: Props) => {
  const isSelectedClass = "font-bold";
  const isNotSelectedClass = "text-gray-500";

  const whiteCapturedPieces = capturedPieces.filter(
    (piece) => piece.color === PieceColor.White
  );

  const blackCapturedPieces = capturedPieces.filter(
    (piece) => piece.color === PieceColor.Black
  );

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center gap-1">
          <WhiteIndicator />
          <span className={isWhitesTurn ? isSelectedClass : isNotSelectedClass}>
            White
          </span>
        </div>
        <div className="flex items-center gap-1">
          {blackCapturedPieces.map((piece) => (
            <div className="w-8 h-8 relative">
              <Piece {...piece} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-1">
          <span className={isWhitesTurn ? isNotSelectedClass : isSelectedClass}>
            Black
          </span>
          <BlackIndicator />
        </div>
        <div className="flex items-center gap-1 self-end">
          {whiteCapturedPieces.map((piece) => (
            <div className="w-8 h-8 relative">
              <Piece {...piece} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
