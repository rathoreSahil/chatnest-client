"use client";

import { useAuth } from "@/context/auth-provider";
import { useStore } from "@/lib/zustand";

const ChatHeader = () => {
  const currentChat = useStore((state) => state.currentChat);
  const { user } = useAuth();
  const displayName = currentChat?.name
    .split("-")
    .filter((name) => name !== user?.name);

  return <div className="p-4 text-xl bg-black border">{displayName}</div>;
};

export default ChatHeader;
