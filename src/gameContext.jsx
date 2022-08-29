import React, { useState } from 'react'

const GameContext = React.createContext()

const GameProvider = ({children}) => {
    const [game, setGame] = useState({})
    return (
    <GameContext.Provider value={{game, setGame}}>
        {children}
    </GameContext.Provider>
  )
}


export { GameContext, GameProvider }