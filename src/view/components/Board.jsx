import Square from "./Square";
import "../components/Board.css";
import { isPieceSelected } from "../../domain/game";

const Board = ({ board, player, selectedPiece, onSelectSquare }) => {
  const isSelected = (square) => isPieceSelected(square, selectedPiece);

  return (
    <div className={`board ${player.side}`}>
      {board.squares.map((square) => (
        <Square
          key={`${square.file}${square.rank}`}
          square={square}
          isSelected={isSelected(square)}
          onSelectSquare={() => onSelectSquare(square)}
        />
      ))}
    </div>
  );
};

export default Board;
