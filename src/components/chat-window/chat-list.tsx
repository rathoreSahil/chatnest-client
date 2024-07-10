"use client";

import { useAuth } from "@/context/auth-provider";
import { useSocket } from "@/context/socket-provider";
import { Chat } from "@/lib/types";
import { getChatsByUserId } from "@/lib/utils";
import { useStore } from "@/lib/zustand";
import { useEffect, useState } from "react";

const ChatList = () => {
  const [chats, setChats] = useState<Chat[] | undefined>(undefined);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const socket = useSocket();
  const { user } = useAuth();

  const search = useStore((state) => state.search);
  const setCurrentChat = useStore((state) => state.setCurrentChat);

  useEffect(() => {
    if (!user) return;
    getChatsByUserId(user._id).then((data) => {
      setChats(data);
    });
  }, [user]);

  useEffect(() => {
    if (!chats) return;
    const results = chats.filter((chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredChats(results);
  }, [chats, search]);

  const openChat = (chat: Chat) => {
    if (!socket) return;
    setCurrentChat(chat);
  };

  if (!chats) return <div>Loading...</div>;

  return (
    <div className="flex-1">
      {filteredChats.map((chat) => {
        return (
          <div
            onClick={() => openChat(chat)}
            key={chat._id}
            className="p-4 cursor-pointer hover:bg-slate-900"
          >
            {chat.name}
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
