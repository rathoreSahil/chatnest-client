"use client";

import { useStore } from "@/lib/zustand";
import { useMessage } from "@/context/message-provider";
import { MessageSkeleton } from "../skeleton/messages-skeleton";
import { useFetchMessages } from "@/hooks/useFetchMessages";
import { useEffect, useRef, useState } from "react";
import MessageContainer from "../utils/message-container";

const ChatContent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, fetchMessagesByChatId] = useFetchMessages();

  const message = useMessage();
  const currentChat = useStore((state) => state.currentChat)!;
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="px-10 flex-1 overflow-y-auto" ref={chatContainerRef}>
      {messages.map((message, idx) => {
        return <MessageContainer key={idx} message={message} />;
      })}
    </div>
  );
};

export default ChatContent;
