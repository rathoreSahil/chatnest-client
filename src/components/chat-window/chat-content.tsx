"use client";

import { useStore } from "@/lib/zustand";
import { useEffect, useRef, useState } from "react";
import useFetchMessages from "@/hooks/useFetchMessages";
import { Loader2 } from "lucide-react";
import { useMessage } from "@/context/message-provider";
import { useAuth } from "@/context/auth-provider";
import { cn } from "@/lib/utils";

const ChatContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, fetchMessagesByChatId] = useFetchMessages();
  const currentChat = useStore((state) => state.currentChat);
  const message = useMessage();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const { user: currentUser } = useAuth();

  console.log("currentChat", currentChat);

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
        const isMyMessage = message.sender === currentUser?._id;
        return (
          <div
            key={index}
            className={cn(
              "py-3 flex",
              isMyMessage ? "justify-end" : "justify-start"
            )}
          >
            <p
              className={cn(
                "max-w-[60%] text-wrap break-words rounded-lg py-2 px-4  inline",
                isMyMessage ? "bg-purple-800" : "bg-gray-800"
              )}
            >
              {message.content}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ChatContent;
