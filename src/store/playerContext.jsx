import React, { useState } from "react";

const PlayerContext = React.createContext();

const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState({});

  return (
    <PlayerContext.Provider value={{ player, setPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
