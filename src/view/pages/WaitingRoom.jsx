import { useParams } from "react-router-dom";
import { useStartGame } from "../hooks/useStartGame";

const WaitingRoom = () => {
  let params = useParams();

  useStartGame();

  return (
    <div>
      <p>Waiting for second player do join</p>
      <p>Room id: {`${params.roomId}`}</p>
    </div>
  );
};

export default WaitingRoom;
