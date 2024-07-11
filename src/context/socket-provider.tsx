"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@/context/auth-provider";
import { getChatIdsByUserId } from "@/lib/utils";

const SocketContext = createContext<Socket | null>(null);

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chatIds, setChatIds] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchChatIds() {
      if (!user) return;
      const response = await getChatIdsByUserId(user._id);
      setChatIds(response);
    }

    fetchChatIds();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    if (!chatIds.length) return;

    const newSocket = io("http://localhost:3182", {
      autoConnect: false,
    });

    newSocket.on("connect", () => {
      console.log("socket connected: ", newSocket.id);
      console.log("user connected: ", user.name);
      newSocket.emit("join-rooms", chatIds);
    });

    newSocket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    setSocket(newSocket);
  }, [user, chatIds]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

const useSocket = () => {
  return useContext(SocketContext);
};

export { SocketContextProvider, useSocket };
