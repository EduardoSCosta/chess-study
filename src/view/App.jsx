import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { SocketProvider } from "../store/socketContext.jsx";
import { GameProvider } from "../store/gameContext";
import Login from "./pages/Login";
import WaitingRoom from "./pages/WaitingRoom";
import JoinRoom from "./pages/JoinRoom";
import Game from "./pages/Game";
import { PlayerProvider } from "../store/playerContext";

function App() {
  return (
    <SocketProvider>
      <PlayerProvider>
        <GameProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/waiting-room/:roomId" element={<WaitingRoom />} />
              <Route path="/join-room" element={<JoinRoom />} />
              <Route path="/game/:roomId" element={<Game />} />
            </Routes>
          </BrowserRouter>
        </GameProvider>
      </PlayerProvider>
    </SocketProvider>
  );
}

export default App;
