import { component$ } from "@builder.io/qwik";
import BlackBishop from "../../../public/pieces/BlackBishop.svg";
import BlackKing from "../../../public/pieces/BlackKing.svg";
import BlackKnight from "../../../public/pieces/BlackKnight.svg";
import BlackPawn from "../../../public/pieces/BlackPawn.svg";
import BlackQueen from "../../../public/pieces/BlackQueen.svg";
import BlackRook from "../../../public/pieces/BlackRook.svg";
import WhiteBishop from "../../../public/pieces/WhiteBishop.svg";
import WhiteKing from "../../../public/pieces/WhiteKing.svg";
import WhiteKnight from "../../../public/pieces/WhiteKnight.svg";
import WhitePawn from "../../../public/pieces/WhitePawn.svg";
import WhiteQueen from "../../../public/pieces/WhiteQueen.svg";
import WhiteRook from "../../../public/pieces/WhiteRook.svg";
import { Piece, PieceType } from "../../models/Piece";

export function getPieceImage(piece: Piece) {
  switch (piece.type) {
    case PieceType.Pawn:
      return piece.color === "white" ? WhitePawn : BlackPawn;
    case PieceType.Knight:
      return piece.color === "white" ? WhiteKnight : BlackKnight;
    case PieceType.Bishop:
      return piece.color === "white" ? WhiteBishop : BlackBishop;
    case PieceType.Rook:
      return piece.color === "white" ? WhiteRook : BlackRook;
    case PieceType.Queen:
      return piece.color === "white" ? WhiteQueen : BlackQueen;
    case PieceType.King:
      return piece.color === "white" ? WhiteKing : BlackKing;
  }
}

export default component$((piece: Piece) => {
  return (
    <img
      src={getPieceImage(piece)}
      className="absolute inset-0 w-full h-full cursor-pointer"
    />
  );
});
