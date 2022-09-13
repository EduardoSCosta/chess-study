import { useState } from "react";
import { useJoinGame } from "../hooks/useJoinGame";
import { useStartGame } from "../hooks/useStartGame";

const JoinRoom = () => {
  const [userName, setUserName] = useState("");
  const [gameId, setGameId] = useState("");
  const joinGame = useJoinGame(userName, gameId);

  useStartGame();

  return (
    <div>
      <input
        placeholder="User name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <input
        placeholder="Game Id"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      ></input>
      <button onClick={joinGame}>Join Game</button>
    </div>
  );
};

export default JoinRoom;
