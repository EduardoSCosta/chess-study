import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { canPlayerPlay } from "../../domain/game";
import { SocketContext } from "../../store/socketContext";
import { useSocket } from "./useSocket";

export const useGame = (game) => {
  let params = useParams();
  const { emit } = useSocket();
  const socket = useContext(SocketContext);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const isPlayerTurn = canPlayerPlay(socket, game);

  const handleSelectSquare = (square) => {
    if (!isPlayerTurn) return;
    if (selectedPiece) {
      //second click
      if (
        selectedPiece.rank === square.rank &&
        selectedPiece.file === square.file
      )
        return unselectPiece(); //clicking same piece
      move(selectedPiece, square);
    } else {
      //firstClick
      if (!square.piece) return;
      selectPiece(square);
    }
  };

  const selectPiece = (square) => {
    setSelectedPiece({ file: square.file, rank: square.rank });
  };

  const unselectPiece = () => {
    setSelectedPiece(null);
  };

  const move = (src, dest) => {
    emit("move", { src, dest, gameId: params.roomId }, (error) => {
      alert(error);
    });
  };

  return { handleSelectSquare, selectedPiece, unselectPiece };
};
