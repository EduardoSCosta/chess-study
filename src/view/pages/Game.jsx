import { useContext, useEffect } from "react";
import { createGame, updateBoard } from "../../domain/game";
import { GameContext } from "../../store/gameContext";
import Board from "../components/Board";
import { useGame } from "../hooks/useGame";
import { usePlayer } from "../hooks/usePlayer";
import { useSocket } from "../hooks/useSocket";

const Game = () => {
  const { game, setGame } = useContext(GameContext);
  const { player } = usePlayer();
  const { on, off } = useSocket();
  const { handleSelectSquare, selectedPiece, unselectPiece } = useGame(game);
  console.log(game.currentTurn);

  useEffect(() => {
    on("updateBoard", (game) => {
      setGame((currentGame) => updateBoard(currentGame, game));
      unselectPiece();
    });

    return () => {
      off("updateBoard");
    };
  }, []);

  return (
    <div>
      <Board
        player={player}
        board={game.status.board}
        selectedPiece={selectedPiece}
        onSelectSquare={handleSelectSquare}
      ></Board>
    </div>
  );
};

export default Game;
