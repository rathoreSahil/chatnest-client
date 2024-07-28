"use client";

import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-provider";
import { useStore } from "@/lib/zustand";
import { useMessage } from "@/context/message-provider";
import { MessageSkeleton } from "../skeleton/messages-skeleton";
import { useFetchMessages } from "@/hooks/useFetchMessages";
import { useEffect, useMemo, useRef, useState } from "react";

const ChatContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, fetchMessagesByChatId] = useFetchMessages();

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const message = useMessage();
  const { authUser } = useAuth();

  const currentChat = useStore((state) => state.currentChat)!;
  const isGroupChat = useMemo(
    () => "participantCount" in currentChat,
    [currentChat]
  );

  // update messages
  useEffect(() => {
    if (!message) return;
    if ((message.groupChat || message.directChat) !== currentChat._id) return;

    setMessages((prevMessages) => [...prevMessages, message]);
  }, [currentChat._id, message]);

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
    if (!currentChat || !currentChat._id) return;
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
        const isMyMessage = message.sender._id === authUser!._id;
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
              {isGroupChat && !isMyMessage && (
                <div className={`text-sm ${randomColor}`}>
                  {message.sender.name}
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
