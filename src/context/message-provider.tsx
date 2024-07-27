"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "@/context/socket-provider";

const MessageContext = createContext<Message | null>(null);

const MessageContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState<Message | null>(null);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
    socket.on("message", (message: Message) => {
      setMessage(message);
    });
    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <MessageContext.Provider value={message}>
      {children}
    </MessageContext.Provider>
  );
};

const useMessage = () => {
  return useContext(MessageContext);
};

export { MessageContextProvider, useMessage };
