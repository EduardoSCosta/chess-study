import { usePlayer } from "./usePlayer";
import { useSocket } from "./useSocket";

const onSuccess = () => {
  console.log("Connectado");
};
const onError = (error) => {
  console.log("Error ao entrar: ", error);
};

export const useJoinGame = (userName, gameId) => {
  const { setSecondPlayer } = usePlayer();
  const { emit } = useSocket();

  const joinGame = () => {
    emit("joinGame", {
      name: userName,
      room: gameId,
      onSuccess,
      onError,
    });
    setSecondPlayer({ name: userName });
  };
  return joinGame;
};
