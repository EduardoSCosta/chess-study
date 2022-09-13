import { getSquarecolor } from "../../domain/game";
import Piece from "./Piece";

const Square = ({ square, isSelected, onSelectSquare }) => {
  const color = getSquarecolor(square);

  return (
    <div
      className={`board_square ${color} ${isSelected && "selected"}`}
      onClick={onSelectSquare}
    >
      {square.piece && <Piece piece={square.piece} />}
    </div>
  );
};

export default Square;
