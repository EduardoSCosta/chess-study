import { useState } from "react";
import { Link } from "react-router-dom";
import { useCreateGame } from "../hooks/useCreateGame";

const Login = () => {
  const [userName, setUserName] = useState("");
  const createGame = useCreateGame();

  return (
    <div>
      <input
        placeholder="User name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <button onClick={() => createGame(userName)}>Create Game</button>
      <Link to="/join-room">Join Game</Link>
    </div>
  );
};

export default Login;
