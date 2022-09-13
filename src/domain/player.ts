import { Side } from "./shared";

export interface Player {
  id: string;
  name: string;
  side: Side;
  createdAt: Date;
}

const createPlayer = (name: string, side: Side, id: string): Player => {
  const player = {
    id,
    name,
    side,
    createdAt: new Date(),
  };

  return player;
};

export const createFirstPlayer = (name: string, id: string): Player => {
  return createPlayer(name, "white", id);
};

export const createSecondPlayer = (name: string, id: string): Player => {
  return createPlayer(name, "black", id);
};
