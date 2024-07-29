"use client";

import { useStore } from "@/lib/zustand";
import ChatContent from "@/components/chat-window/chat-content";
import ChatFooter from "@/components/chat-window/chat-footer";
import ChatHeader from "@/components/chat-window/chat-header";
import { useAuth } from "@/context/auth-provider";
import Greeting from "../utils/greeting";
import { cn } from "@/lib/utils";
import { ChatProps } from "@/types";

const Chat = ({ className }: ChatProps) => {
  const authUser = useAuth().authUser!;
  const currentChat = useStore((state) => state.currentChat);

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {currentChat ? (
        <>
          <ChatHeader />
          <ChatContent />
          <ChatFooter />
        </>
      ) : (
        <Greeting name={authUser.name} />
      )}
    </div>
  );
};

export default Chat;
