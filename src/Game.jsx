import React, { useContext, useEffect, useState } from 'react'
import { GameContext} from './gameContext'
import './Board.css'
import { SocketContext } from './socketContext';
import { useParams } from "react-router-dom";
import Piece from './Piece'


const Square = ({square, isSelected, onSelectSquare}) => {
  const color = (square.file.charCodeAt(0) - 97 + square.rank) % 2 ? "white" : 'black';

  return <div className={`board_square ${color} ${isSelected && 'selected'}`} onClick={onSelectSquare}>
    {square.piece && <Piece piece={square.piece}/>}
  </div>
}

const Board = ({board, selectedPiece, onSelectSquare}) => {

  const isSelected = (square) => {
    if(!square.piece || !selectedPiece) return false;

    return (selectedPiece.rank === square.rank && selectedPiece.file === square.file)
  }
  return <div className='board'>
    {board.squares.map(square => <Square square={square} isSelected={isSelected(square)} onSelectSquare={() => onSelectSquare(square)}/>)}
  </div>
}

const Game = () => {
  let params = useParams();
  const { game, setGame } = useContext(GameContext);
  const socket = useContext(SocketContext);
  const [selectedPiece, setSelectedPiece] = useState(null);
  console.log(game.currentTurn)
  const isPlayerTurn = socket.id === game.currentTurn

  const handleSelectSquare = (square) => {
    if(!isPlayerTurn) return;
    if(selectedPiece){ //second click
      if((selectedPiece.rank === square.rank && selectedPiece.file === square.file)) return unselectPiece() //clicking same piece
      move(selectedPiece, square)
    }else{ //firstClick
      if(!square.piece) return;
      selectPiece(square)
    }
  }

  const selectPiece = (square) => {
    setSelectedPiece({file: square.file, rank: square.rank})
    
  }

  const unselectPiece = () => {
    setSelectedPiece(null)
  }

  const move = (src, dest) => {
    socket.emit('move', {src, dest, gameId: params.roomId}, (error) => {
      alert(error)
    })
  }

  useEffect(() => {
    socket.on('updateBoard', (game) => {
      setGame(game);
      unselectPiece()
    })
  
    return () => {
      socket.off('updateBoard')
    }
  }, [])
  


  return (
    <div>
      <Board board={game.status.board} selectedPiece={selectedPiece} onSelectSquare={handleSelectSquare}></Board>
    </div>
  )
}

export default Game