"use client";

import { useAuth } from "@/context/auth-provider";
import { useSocket } from "@/context/socket-provider";
import useFetchChats from "@/hooks/useFetchChats";
import { useStore } from "@/lib/zustand";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ProfilePhoto from "../profile/profile-photo";
import ChatListSkeleton from "../skeleton/chat-list-skeleton";

const ChatList = () => {
  const [loading, fetchChats] = useFetchChats();
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

  const chats = useStore((state) => state.chats);
  const search = useStore((state) => state.search);
  const setChats = useStore((state) => state.setChats);
  const setCurrentChat = useStore((state) => state.setCurrentChat);

  const socket = useSocket();
  const { user } = useAuth();

  // fetch chats by user id
  const updateChatList = useCallback(() => {
    fetchChats().then((data) => {
      setChats(data);

      if (!socket) return;
      data.map((chat) => {
        socket.emit("join-room", chat._id);
      });
    });
  }, [fetchChats, setChats, socket]);

  // update chat list
  useEffect(() => {
    updateChatList();
    socket?.on("refresh", () => {
      updateChatList();
    });
  }, [socket, updateChatList]);

  // filter chats based on search
  useEffect(() => {
    if (!chats.length) return;
    const results = chats.filter((chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredChats(results);
  }, [chats, search]);

  // loading state
  if (loading) {
    return <ChatListSkeleton length={8} />;
  }

  // render chats
  return (
    <>
      {filteredChats.length ? (
        filteredChats.map((chat) => {
          const displayName = chat.name
            .split("-")
            .filter((name) => name !== user?.name)[0];

          const chatPhoto = chat.photo
            .split(" ")
            .filter((photo) => photo !== user?.photo)[0];
          return (
            <div
              onClick={() => setCurrentChat(chat)}
              key={chat._id}
              className="p-4 cursor-pointer hover:bg-slate-900 flex gap-4 items-center"
            >
              <ProfilePhoto src={chatPhoto} />
              {displayName}
            </div>
          );
        })
      ) : (
        <div className="text-center mt-10">Your chats will appear here...</div>
      )}
    </>
  );
};

export default ChatList;
