import { Server } from "socket.io";
import chess from "./chess/src/main.js";
import { v4 as uuid } from "uuid";

const io = new Server({ cors: { origin: "*" } });

const games = new Map();

const createNotatedMove = (notatedMoves, src, dest) => {
  const moveKey = Object.keys(notatedMoves).find((key) => {
    const move = notatedMoves[key];

    const isSameDest =
      move.dest.file === dest.file && move.dest.rank === dest.rank;
    const isSameSrc = move.src.file === src.file && move.src.rank === src.rank;

    return isSameDest && isSameSrc;
  });

  return moveKey;
};

const createGame = (socketId, userName) => {
  const gameClient = chess.create();
  const currentTurn = socketId;
  const players = [{ socket: socketId, name: userName, side: "white" }];
  const gameId = uuid();

  games.set(gameId, { gameClient, currentTurn, players, id: gameId });

  return {
    room: gameId,
  };
};

const joinGame = (socketId, userName, room) => {
  const game = games.get(room);

  if (!game) return { error: "Jogo não encontrado" };
  if (game.players.length === 2) return { error: "Jogo ja está cheio" };

  game.players.push({ socket: socketId, name: userName, side: "black" });

  return {
    game,
  };
};

const movePiece = (src, dest, gameId, socketId) => {
  console.log(src, dest);
  const game = games.get(gameId);

  if (!game) return { error: "Jogo não encontrado" };
  if (game.currentTurn !== socketId) return { error: "Não é a sua vez" };

  const availabeMoves = game.gameClient.getStatus().notatedMoves;
  const notationMove = createNotatedMove(availabeMoves, src, dest);
  console.log(notationMove);
  if (!(notationMove in availabeMoves)) return { error: "Movimento inválido" };

  try {
    game.gameClient.move(notationMove);
  } catch (error) {
    return { error };
  }

  const nextPlayer = game.players.find((p) => p.socket !== socketId);
  game.currentTurn = nextPlayer.socket;

  return {
    game,
  };
};

io.on("connection", (socket) => {
  console.log("Connected: ", socket.id);
  socket.on("createGame", ({ name }, onSuccess, onError) => {
    const { room } = createGame(socket.id, name);
    socket.join(room);
    console.log(`User ${name} joinned room ${room}`);
    onSuccess(room);
  });

  socket.on("joinGame", ({ name, room, onSuccess, onError }) => {
    const { game, error } = joinGame(socket.id, name, room);
    if (error) return onError(error);
    socket.join(game.id);
    console.log(onSuccess);
    io.in(game.id).emit("startGame", {
      currentTurn: game.currentTurn,
      id: game.id,
      status: game.gameClient.getStatus(),
    });
  });

  socket.on("move", ({ src, dest, gameId }, onError) => {
    const { game, error } = movePiece(src, dest, gameId, socket.id);
    if (error) return onError(error);
    io.in(game.id).emit("updateBoard", {
      currentTurn: game.currentTurn,
      id: game.id,
      status: game.gameClient.getStatus(),
    });
  });
});

io.listen(5000);
