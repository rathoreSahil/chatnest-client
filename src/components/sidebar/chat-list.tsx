"use client";

import { useStore } from "@/lib/zustand";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-provider";
import { useSocket } from "@/context/socket-provider";
import { useFetchChats } from "@/hooks/useFetchChats";
import { useMessage } from "@/context/message-provider";

import ProfilePhoto from "@/components/profile/profile-photo";
import ChatListSkeleton from "@/components/skeleton/chat-list-skeleton";

const ChatList = () => {
  const { loading } = useFetchChats();
  const [filteredChats, setFilteredChats] = useState<typeof chats>([]);

  const { chats, search, addNewChat, reorderChats, setCurrentChat } =
    useStore();

  const socket = useSocket();
  const message = useMessage();
  const authUser = useAuth().authUser!;

  // Reorder chats based on new message
  useEffect(() => {
    if (!message) return;

    const chatIdToShift = message.directChat || message.groupChat || "";
    reorderChats(chatIdToShift, message.content);
  }, [message, reorderChats]);

  // New chat handle logic
  useEffect(() => {
    if (!socket) return;
    socket.on("new-chat", (newChat) => {
      socket.emit("join-room", newChat._id);
      addNewChat(newChat);
    });

    return () => {
      socket.off("new-chat");
    };
  }, [addNewChat, socket]);

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
              className="p-4 cursor-pointer flex gap-4 items-center"
            >
              <ProfilePhoto src={displayPhoto} />
              <div className=" w-9/12">
                <p>{displayName}</p>
                <p className="text-sm opacity-60 truncate ">
                  {chat.lastMessage}
                </p>
              </div>
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
