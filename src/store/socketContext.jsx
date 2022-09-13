import React from "react";
import { socket } from "../service/socket";

const SocketContext = React.createContext();

const SocketProvider = ({ children }) => {
  console.log("called");
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
