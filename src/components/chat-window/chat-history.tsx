"use client";

import { Message } from "@/lib/types";
import { getMessagesByChatId } from "@/lib/utils";
import { useStore } from "@/lib/zustand";
import { useEffect, useState } from "react";

const ChatHistory = () => {
  const [prevMessages, setPrevMessages] = useState<Message[]>([]);
  const currentChat = useStore((state) => state.currentChat);

  useEffect(() => {
    if (!currentChat) return;
    getMessagesByChatId(currentChat._id).then((data) => {
      setPrevMessages(data);
    });

    return () => {
      setPrevMessages([]);
    };
  }, [currentChat]);

  return (
    <>
      {prevMessages.map((message, index) => (
        <div key={index} className="p-4">
          {message.content}
        </div>
      ))}
    </>
  );
};

export default ChatHistory;
