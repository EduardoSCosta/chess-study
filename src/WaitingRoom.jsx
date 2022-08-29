import React, { useContext } from 'react'
import { useParams } from "react-router-dom";
import { SocketContext } from './socketContext'
import { useNavigate } from "react-router-dom";
import { GameContext} from './gameContext'

const WaitingRoom = () => {
  let navigate = useNavigate();
  let params = useParams();
  const socket = useContext(SocketContext);
  const { setGame } = useContext(GameContext);

  socket.on('startGame', (game) => {
    setGame(game)
    navigate(`/game/${game.id}`)
  })

  return (
    <div>
        <p>Waiting for second player do join</p>
        <p>Room id: {`${params.roomId}`}</p>
    </div>
  )
}

export default WaitingRoom