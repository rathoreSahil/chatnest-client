"use client";

import { useAuth } from "@/context/auth-provider";
import { useSocket } from "@/context/socket-provider";
import useFetchChats from "@/hooks/useFetchChats";
import { Chat } from "@/lib/types";
import { useStore } from "@/lib/zustand";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ProfilePhoto from "../profile/profile-photo";

const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
  const [loading, fetchChatsByUserId] = useFetchChats();
  const search = useStore((state) => state.search);
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const { user } = useAuth();
  const socket = useSocket();

  // fetch chats by user id
  const updateChatList = useCallback(() => {
    if (!user) return;
    fetchChatsByUserId(user._id).then((data) => {
      setChats(data);

      if (!socket) return;
      data.map((chat) => {
        socket.emit("join-room", chat._id);
      });
    });
  }, [fetchChatsByUserId, socket, user]);

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
    return (
      <div className="flex-1">
        <Loader2 className="animate-spin w-full" />
      </div>
    );
  }

  // render chats
  return (
    <>
      {filteredChats.length ? (
        filteredChats.map((chat) => {
          console.log("Chat:", chat.photo);
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
