"use client";

import { useStore } from "@/lib/zustand";
import { useEffect, useState } from "react";
import { Message } from "@/lib/types";
import { getMessagesByChatId } from "@/lib/utils";
import { useSocket } from "@/context/socket-provider";

const ChatContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const currentChat = useStore((state) => state.currentChat);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (message: Message) => {
      console.log("message", message);
      if (message.chat !== currentChat?._id) return;
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [currentChat?._id, socket]);

  useEffect(() => {
    if (!currentChat) return;
    getMessagesByChatId(currentChat._id).then((data) => {
      setMessages(data);
    });

    return () => {
      setMessages([]);
    };
  }, [currentChat]);

  return (
    <div className="flex-1">
      {messages.map((message, index) => {
        return (
          <div key={index} className="p-4">
            {message.content}
          </div>
        );
      })}
    </div>
  );
};

export default ChatContent;
