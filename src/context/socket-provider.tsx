"use client";

import { socket } from "@/socket";
import { createContext, useContext } from "react";

const SocketContext = createContext(socket);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
