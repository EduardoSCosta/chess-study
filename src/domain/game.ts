import { Player } from "./player";
import { Side } from "./shared";

interface Piece {
  side: {
    name: Side;
  };
  type: string;
}

interface Square {
  file: string;
  rank: number;
  piece?: Piece | null;
}

interface Board {
  squares: Square[];
  isCheck: Boolean;
  isCheckmate: Boolean;
  isRepetition: Boolean;
  isStalemate: Boolean;
}

interface Game {
  id: string;
  currentTurn: string;
  status: {
    board: Board;
  };
}

export const createGame = (game: Game): Game => {
  const newGame = {
    id: game.id,
    currentTurn: game.currentTurn,
    status: {
      board: {
        squares: [...game.status.board.squares],
        isCheck: game.status.board.isCheck,
        isCheckmate: game.status.board.isCheckmate,
        isRepetition: game.status.board.isRepetition,
        isStalemate: game.status.board.isStalemate,
      },
    },
  };

  return newGame;
};

export const updateBoard = (oldBoard: Game, newBoard: Game): Game => {
  const game = {
    id: oldBoard.id,
    currentTurn: newBoard.currentTurn,
    status: {
      board: {
        squares: [...newBoard.status.board.squares],
        isCheck: newBoard.status.board.isCheck,
        isCheckmate: newBoard.status.board.isCheckmate,
        isRepetition: newBoard.status.board.isRepetition,
        isStalemate: newBoard.status.board.isStalemate,
      },
    },
  };

  return game;
};

export const canPlayerPlay = (player: Player, game: Game): Boolean => {
  return player.id === game.currentTurn;
};

export const isPieceSelected = (square: Square, selectedPiece: Square) => {
  if (!square.piece || !selectedPiece) return false;

  return (
    selectedPiece.rank === square.rank && selectedPiece.file === square.file
  );
};

export const getSquarecolor = (square: Square) => {
  return (square.file.charCodeAt(0) - 97 + square.rank) % 2 ? "white" : "black";
};
