"use client";

import { useSocket } from "@/context/socket-provider";
import { Message } from "@/lib/types";
import { useEffect, useState } from "react";

const ChatContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <div className="flex-1">
      {messages.map((message, index) => (
        <div key={index} className="p-4">
          {message.content}
        </div>
      ))}
    </div>
  );
};

export default ChatContent;
