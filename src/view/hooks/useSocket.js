import { useContext } from "react";
import { SocketContext } from "../../store/socketContext";

export const useSocket = () => {
  const socket = useContext(SocketContext);
  const socketId = socket.id;

  const emit = (eventName, ...params) => {
    socket.emit(eventName, ...params);
  };

  const on = (eventName, ...params) => {
    socket.on(eventName, ...params);
  };

  const off = (eventName) => {
    socket.off(eventName);
  };

  return { emit, on, off, socketId };
};
