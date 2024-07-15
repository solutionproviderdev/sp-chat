// socketManager.js
import { getSocket } from "./getSocket";

let socket = null;

export const initializeSocket = () => {
  if (!socket || !socket.connected) {
    socket = getSocket();
    socket.connect();
  }
  return socket;
};

export const getInitializedSocket = () => {
  return initializeSocket();
};