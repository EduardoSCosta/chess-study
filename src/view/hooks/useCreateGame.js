import { useNavigate } from "react-router-dom";
import { usePlayer } from "./usePlayer";
import { useSocket } from "./useSocket";

export const useCreateGame = () => {
  const { emit } = useSocket();
  const { setFirstPlayer } = usePlayer();
  let navigate = useNavigate();

  const createGame = (userName) => {
    emit("createGame", { name: userName }, (id) => {
      console.log(id);
      setFirstPlayer({ name: userName });

      navigate(`/waiting-room/${id}`);
    });
  };
  return createGame;
};
