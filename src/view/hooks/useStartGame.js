import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../store/gameContext";
import { useSocket } from "./useSocket";
import { createGame } from "../../domain/game";

export const useStartGame = () => {
  const { on, off } = useSocket();
  const { setGame } = useContext(GameContext);
  let navigate = useNavigate();

  useEffect(() => {
    on("startGame", (game) => {
      setGame((currentGame) => ({ ...currentGame, ...createGame(game) }));
      navigate(`/game/${game.id}`);
    });

    return () => {
      off("startGame");
    };
  }, []);
};
