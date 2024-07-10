"use client";

import { useStore } from "@/lib/zustand";

const ChatHeader = () => {
  const currentChat = useStore((state) => state.currentChat);
  return <div className="">{currentChat?.name}</div>;
};

export default ChatHeader;
