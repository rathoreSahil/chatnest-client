"use client";

import { useStore } from "@/lib/zustand";
import { useEffect, useRef, useState } from "react";
import useFetchMessages from "@/hooks/useFetchMessages";
import { useMessage } from "@/context/message-provider";
import { useAuth } from "@/context/auth-provider";
import { cn } from "@/lib/utils";
import MessageSkeleton from "../skeleton/messages-skeleton";

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

    return () => {
      setMessages([]);
    };
  }, [message, currentChat]);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return () => {
      chatContainer.scrollTop = 0;
    };
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

  // loading state
  if (loading) {
    return (
      <div className="px-10 flex-1 overflow-y-auto">
        <MessageSkeleton length={8} />
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
              "my-3 flex",
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
