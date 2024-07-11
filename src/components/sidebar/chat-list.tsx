"use client";

import { useAuth } from "@/context/auth-provider";
import { Chat } from "@/lib/types";
import { getChatsByUserId } from "@/lib/utils";
import { useStore } from "@/lib/zustand";
import { useEffect, useState } from "react";

const ChatList = () => {
  const [chats, setChats] = useState<Chat[] | undefined>(undefined);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

  const { user } = useAuth();
  const isNewChatModalOpen = useStore((state) => state.isNewChatModalOpen);

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

  if (!chats) return <div>Loading...</div>;

  return (
    <div className="flex-1">
      {filteredChats.length ? (
        filteredChats.map((chat) => {
          return (
            <div
              onClick={() => setCurrentChat(chat)}
              key={chat._id}
              className="p-4 cursor-pointer hover:bg-slate-900"
            >
              {chat.name}
            </div>
          );
        })
      ) : (
        <div className="text-center mt-10">Your chats will appear here...</div>
      )}
    </div>
  );
};

export default ChatList;
