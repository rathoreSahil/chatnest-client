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

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const message = useMessage();
  const { user: currentUser } = useAuth();

  const currentChat = useStore((state) => state.currentChat);

  // update messages
  useEffect(() => {
    if (message.chat !== currentChat?._id) return;

    setMessages((prevMessages) => [...prevMessages, message]);
  }, [message, currentChat]);

  // scroll to bottom
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;
    chatContainer.scrollTop = chatContainer.scrollHeight;

    return () => {
      chatContainer.scrollTop = 0;
    };
  }, [messages]);

  // fetch messages by chat id
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
        <MessageSkeleton length={14} />
      </div>
    );
  }

  const colors = [
    "text-red-400",
    "text-blue-400",
    "text-green-400",
    "text-yellow-400",
    "text-indigo-400",
    "text-purple-400",
    "text-pink-400",
    "text-lime-400",
    "text-teal-400",
  ];

  return (
    <div className="px-10 flex-1 overflow-y-auto" ref={chatContainerRef}>
      {messages.map((message, index) => {
        // console.log(message.sender);
        const isMyMessage = (message.sender as User)._id === currentUser?._id;
        const randomColor = colors[Math.round(Math.random() * colors.length)];
        const messageCreatedAt = new Date(message.createdAt);
        return (
          <div
            key={index}
            className={cn(
              "my-3 flex",
              isMyMessage ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "max-w-[60%] text-wrap break-words rounded-lg px-3 py-2",
                isMyMessage ? "bg-purple-800" : "bg-gray-800"
              )}
            >
              {(currentChat as Chat).isGroupChat && !isMyMessage && (
                <div className={`text-sm ${randomColor}`}>
                  {(message.sender as User).name}
                </div>
              )}
              <div className="flex gap-3">
                <p className="flex-1 text-wrap break-words self-center">
                  {message.content}
                </p>
                <div className="text-[12px] opacity-70 text-right w-min self-end">
                  {messageCreatedAt.getHours().toString().padStart(2, "0")}:
                  {messageCreatedAt.getMinutes().toString().padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatContent;
