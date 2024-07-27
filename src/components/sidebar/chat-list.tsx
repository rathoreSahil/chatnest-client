"use client";

import { useAuth } from "@/context/auth-provider";
import { useSocket } from "@/context/socket-provider";
import { useFetchChats } from "@/hooks/useFetchChats";
import { useStore } from "@/lib/zustand";
import { useCallback, useEffect, useState } from "react";
import ProfilePhoto from "../profile/profile-photo";
import ChatListSkeleton from "../skeleton/chat-list-skeleton";

const ChatList = () => {
  const [loading, fetchChats] = useFetchChats();
  const [filteredChats, setFilteredChats] = useState<typeof chats>([]);

  const chats = useStore((state) => state.chats);
  const search = useStore((state) => state.search);
  const setChats = useStore((state) => state.setChats);
  const currentChat = useStore((state) => state.currentChat);
  const setCurrentChat = useStore((state) => state.setCurrentChat);

  const socket = useSocket();
  const authUser = useAuth().authUser!;

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

    return () => {
      socket?.off("refresh");
    };
  }, [socket, updateChatList]);

  // filter chats based on search
  useEffect(() => {
    if (!chats.length) return;
    const results = chats.filter((chat) => {
      const isGroupChat = "participantCount" in chat;
      let chatName = "";
      if (isGroupChat) {
        chatName = chat.name;
      } else {
        chatName =
          authUser._id === chat.user1._id ? chat.user2.name : chat.user1.name;
      }

      return chatName.toLowerCase().includes(search.toLowerCase());
    });

    setFilteredChats(results);
  }, [authUser._id, chats, search]);

  // loading state
  if (loading) {
    return <ChatListSkeleton length={8} />;
  }

  // render chats
  return (
    <>
      {filteredChats.length ? (
        filteredChats.map((chat) => {
          const isGroupChat = "participantCount" in chat;
          let displayName;
          let displayPhoto;
          if (isGroupChat) {
            displayName = chat.name;
            displayPhoto = chat.photo;
          } else {
            const otherUser =
              authUser._id === chat.user1._id ? chat.user2 : chat.user1;

            displayName = otherUser.name;
            displayPhoto = otherUser.photo;
          }

          return (
            <div
              onClick={() => setCurrentChat(chat)}
              key={chat._id}
              className="p-4 cursor-pointer hover:bg-slate-900 flex gap-4 items-center"
            >
              <ProfilePhoto src={displayPhoto} />
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
