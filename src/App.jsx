import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './App.css' 
import { SocketProvider } from './socketContext.jsx';
import { GameProvider } from "./gameContext";
import Login from "./Login"
import WaitingRoom from "./WaitingRoom"
import JoinRoom from "./JoinRoom"
import Game from "./Game"

function App() {
  return (
    <SocketProvider>
      <GameProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/waiting-room/:roomId' element={<WaitingRoom/>} />
            <Route path='/join-room' element={<JoinRoom/>} />
            <Route path='/game/:roomId' element={<Game/>} />
          </Routes>
        </BrowserRouter>
      </GameProvider>
    </SocketProvider>
  )
}

export default App
