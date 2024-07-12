"use client";

import { useAuth } from "@/context/auth-provider";
import useFetchChats from "@/hooks/useFetchChats";
import { Chat } from "@/lib/types";
import { useStore } from "@/lib/zustand";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [loading, fetChatsByUserId] = useFetchChats();

  const { user } = useAuth();

  const search = useStore((state) => state.search);
  const setCurrentChat = useStore((state) => state.setCurrentChat);

  useEffect(() => {
    if (!user) return;
    fetChatsByUserId(user._id).then((data) => {
      setChats(data);
    });
  }, [user, fetChatsByUserId]);

  useEffect(() => {
    if (!chats.length) return;
    const results = chats.filter((chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredChats(results);
  }, [chats, search]);

  if (loading) {
    return <Loader2 className="animate-spin w-full" />;
  }

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
