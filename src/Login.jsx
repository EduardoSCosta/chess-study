import React, { useContext, useState } from 'react'
import { SocketContext } from './socketContext'
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    let navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const socket = useContext(SocketContext)
    const handleCreateGame = () => {
        socket.emit('createGame', {name: userName}, (id) => {
            console.log(id)
            navigate(`/waiting-room/${id}`)
        })
    }
  return (
    <div>
        <input placeholder='User name' value={userName} onChange={e => setUserName(e.target.value)}></input>
        <button onClick={handleCreateGame}>Create Game</button>
        <Link to="/join-room">Join Game</Link>
    </div>
  )
}

export default Login