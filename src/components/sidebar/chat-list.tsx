"use client";

import { useStore } from "@/lib/zustand";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-provider";
import { useFetchChats } from "@/hooks/useFetchChats";
import { useMessage } from "@/context/message-provider";
import { getChatName } from "@/lib/utils";

import SidebarListSkeleton from "@/components/skeleton/sidebar-list-skeleton";
import ChatListItem from "@/components/sidebar/chat-list-item";

const ChatList = () => {
  const { loading } = useFetchChats();
  const { chats, search, reorderChats } = useStore();
  const [filteredChats, setFilteredChats] =
    useState<(GroupChat | DirectChat)[]>();

  const message = useMessage();
  const authUser = useAuth().authUser!;

  // Reorder chats based on new message
  useEffect(() => {
    if (!message) return;
    const chatIdToShift = message.directChat || message.groupChat || "";
    reorderChats(chatIdToShift, message.content);
  }, [message, reorderChats]);

  // filter chats based on search
  useEffect(() => {
    if (!chats.length) return;
    const results = chats.filter((chat) => {
      const chatName = getChatName(chat, authUser._id);
      return chatName.toLowerCase().includes(search.toLowerCase());
    });
    setFilteredChats(results);
  }, [authUser._id, chats, search]);

  // loading state
  if (loading) return <SidebarListSkeleton length={8} />;

  // render chats
  return (
    <div>
      {filteredChats ? (
        filteredChats.map((chat) => <ChatListItem key={chat._id} chat={chat} />)
      ) : (
        <p className="text-center mt-10">Your chats will appear here...</p>
      )}
    </div>
  );
};

export default ChatList;
