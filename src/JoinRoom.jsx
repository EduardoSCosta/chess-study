import React, { useContext, useState } from 'react'
import { SocketContext } from './socketContext'
import { useNavigate } from "react-router-dom"
import { GameContext} from './gameContext'

const onSuccess = () => {
    console.log('Connectado')
}
const onError = (error) => {
    console.log('Error ao entrar: ', error)
}
const JoinRoom = () => {
    let navigate = useNavigate();
    const socket = useContext(SocketContext)
    const { setGame } = useContext(GameContext);
    const [userName, setUserName] = useState('');
    const [gameId, setGameId] = useState('');

    const handleJoinGame = () => {
        socket.emit('joinGame', 
            {name: userName, room: gameId},
            onSuccess,
            onError
        )
    }

    socket.on('startGame', (game) => {
        setGame(game)
        navigate(`/game/${game.id}`)
    })
  return (
    <div>
        <input placeholder='User name' value={userName} onChange={e => setUserName(e.target.value)}></input>
        <input placeholder='Game Id' value={gameId} onChange={e => setGameId(e.target.value)}></input>
        <button onClick={handleJoinGame}>Join Game</button>
    </div>
  )
}

export default JoinRoom