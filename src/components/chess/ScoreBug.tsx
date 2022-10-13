import { component$ } from "@builder.io/qwik";
import { Piece as PieceModel, PieceColor, PieceType } from "~/models/Piece";
import Piece from "./Piece";

interface Props {
  isWhitesTurn: boolean;
  capturedPieces: PieceModel[];
}

interface CapturedPieceCounts {
  type: PieceType;
  color: PieceColor;
  count: number;
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

  const capturedPieceCounts: CapturedPieceCounts[] = capturedPieces.reduce(
    (acc, piece) => {
      const existingPiece = acc.find(
        (p) => p.type === piece.type && p.color === piece.color
      );

      if (existingPiece) {
        existingPiece.count++;
      } else {
        acc.push({
          type: piece.type,
          color: piece.color,
          count: 1,
        });
      }

      return acc;
    },
    [] as CapturedPieceCounts[]
  );

  const whiteCapturedPieces = capturedPieceCounts.filter(
    (piece) => piece.color === PieceColor.White
  );

  const blackCapturedPieces = capturedPieceCounts.filter(
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
        <div className="flex items-center">
          {blackCapturedPieces.map((piece) => (
            <div className="flex items-center">
              <div className="w-8 h-8 relative">
                <Piece {...piece} />
              </div>
              {piece.count > 1 && (
                <div className="self-end">
                  <span className="text-xs">x{piece.count}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-1 justify-end">
          <span className={isWhitesTurn ? isNotSelectedClass : isSelectedClass}>
            Black
          </span>
          <BlackIndicator />
        </div>
        <div className="flex items-center justify-end">
          {whiteCapturedPieces.map((piece) => (
            <div className="flex items-center">
              <div className="w-8 h-8 relative">
                <Piece {...piece} />
              </div>
              {piece.count > 1 && (
                <div className="self-end">
                  <span className="text-xs">x{piece.count}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
