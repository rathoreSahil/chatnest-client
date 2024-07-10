"use client";

import { useStore } from "@/lib/zustand";
import ChatHistory from "@/components/chat-window/chat-history";
import { useEffect, useState } from "react";
import { Message } from "@/lib/types";

const ChatContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const currentChat = useStore((state) => state.currentChat);

  useEffect(() => {}, []);

  return (
    <div className="flex-1">
      <ChatHistory />
      {messages.map((message, index) => {
        if (message.chat === currentChat?._id)
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
