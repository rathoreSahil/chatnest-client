"use client";

import { io, Socket } from "socket.io-client";
import { useAuth } from "@/context/auth-provider";
import { useChatListStore } from "@/states/chatListState";
import { createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext<Socket | null>(null);

const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { authUser } = useAuth();
  const { addNewChat } = useChatListStore();
  const [socket, setSocket] = useState<Socket | null>(null);

  // create socket connection
  useEffect(() => {
    if (!authUser) return;

    const newSocket = io("http://localhost:3182", {
      autoConnect: false,
      query: {
        userId: authUser._id,
      },
    });

    newSocket.on("connect", () => {
      console.log("socket connected: ", newSocket.id);
      console.log("user connected: ", authUser.name);
    });

    newSocket.on("new-chat", (newChat) => {
      newSocket.emit("join-room", newChat._id);
      addNewChat(newChat);
    });

    newSocket.on("disconnect", () => {
      console.log("socket disconnected");
    });

    setSocket(newSocket);
  }, [addNewChat, authUser]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

const useSocket = () => {
  return useContext(SocketContext);
};

export { SocketContextProvider, useSocket };
