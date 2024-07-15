"use client";

import { useStore } from "@/lib/zustand";
import { useEffect, useRef, useState } from "react";
import { Message } from "@/lib/types";
import useFetchMessages from "@/hooks/useFetchMessages";
import { Loader2 } from "lucide-react";
import { useMessage } from "@/context/message-provider";
import { useAuth } from "@/context/auth-provider";

const ChatContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, fetchMessagesByChatId] = useFetchMessages();
  const currentChat = useStore((state) => state.currentChat);
  const message = useMessage();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (message.chat !== currentChat?._id) return;
    setMessages((prevMessages) => [...prevMessages, message]);
  }, [message, currentChat]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!currentChat) return;
    fetchMessagesByChatId(currentChat._id).then((data) => {
      setMessages(data);
    });

    return () => {
      setMessages([]);
    };
  }, [currentChat, fetchMessagesByChatId]);

  if (loading) {
    return (
      <div className="flex-1">
        <Loader2 className="animate-spin w-full" />
      </div>
    );
  }

  return (
    <div className="px-10 flex-1 overflow-y-auto" ref={chatContainerRef}>
      {messages.map((message, index) => {
        let align = "text-left";
        if (message.sender === currentUser?._id) {
          align = "text-right";
        }
        return (
          <div key={index} className={`py-4 ${align}`}>
            {message.content}
          </div>
        );
      })}
    </div>
  );
};

export default ChatContent;
