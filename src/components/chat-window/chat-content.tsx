"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { useChatStore } from "@/states/chatStates";
import { useMessage } from "@/context/message-provider";
import { useFetchMessages } from "@/hooks/useFetchMessages";

import toast from "react-hot-toast";
import MessageContainer from "@/components/utils/message-container";
import MessageSkeleton from "@/components/skeleton/messages-skeleton";

const ChatContent = () => {
  const message = useMessage();
  const currentChat = useChatStore().currentChat!;

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
    fetchMessagesByChatId(currentChat._id)
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        toast.error("Error fetching messages", error.message);
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
