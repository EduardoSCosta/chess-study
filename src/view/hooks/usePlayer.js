import { useContext } from "react";
import { PlayerContext } from "../../store/playerContext";
import { createFirstPlayer, createSecondPlayer } from "../../domain/player";
import { useSocket } from "./useSocket";

export const usePlayer = () => {
  const { player, setPlayer: setPlayerContext } = useContext(PlayerContext);
  const { socketId } = useSocket();

  const setFirstPlayer = ({ name }) => {
    setPlayerContext(createFirstPlayer(name, socketId));
  };

  const setSecondPlayer = ({ name }) => {
    setPlayerContext(createSecondPlayer(name, socketId));
  };
  return { player, setFirstPlayer, setSecondPlayer };
};
