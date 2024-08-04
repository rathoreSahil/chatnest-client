"use client";

import { useStore } from "@/lib/zustand";
import { useMessage } from "@/context/message-provider";
import { useFetchMessages } from "@/hooks/useFetchMessages";
import { useEffect, useState } from "react";

import MessageContainer from "@/components/utils/message-container";
import MessageSkeleton from "@/components/skeleton/messages-skeleton";
import { ScrollArea } from "../ui/scroll-area";

const ChatContent = () => {
  const message = useMessage();
  const currentChat = useStore().currentChat!;

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, fetchMessagesByChatId] = useFetchMessages();

  // update messages
  useEffect(() => {
    if (!message) return;
    if ((message.groupChat || message.directChat) !== currentChat._id) return;
    setMessages((prevMessages) => [...prevMessages, message]);
  }, [currentChat._id, message]);

  // fetch messages by chat id
  useEffect(() => {
    fetchMessagesByChatId(currentChat._id).then((data) => {
      setMessages(data);
    });

    return () => {
      setMessages([]);
    };
  }, [currentChat, fetchMessagesByChatId]);

  return (
    <ScrollArea className="px-10 py-2 flex-1">
      {loading ? (
        <MessageSkeleton length={14} />
      ) : (
        messages.map((message, idx) => {
          return <MessageContainer key={idx} message={message} />;
        })
      )}
    </ScrollArea>
  );
};

export default ChatContent;
