"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/context/auth-provider";

const SocketContext = createContext<Socket | null>(null);

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { user } = useAuth();

  // create socket connection
  useEffect(() => {
    if (!user) return;

    const newSocket = io("http://localhost:3182", {
      autoConnect: false,
      query: {
        userId: user._id,
      },
    });

    newSocket.on("connect", () => {
      console.log("socket connected: ", newSocket.id);
      console.log("user connected: ", user.name);
    });

    newSocket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    setSocket(newSocket);
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

const useSocket = () => {
  return useContext(SocketContext);
};

export { SocketContextProvider, useSocket };
