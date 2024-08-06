"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/lib/zustand";
import { useAuth } from "@/context/auth-provider";

import Greeting from "@/components/utils/greeting";
import ChatHeader from "@/components/chat-window/chat-header";
import ChatContent from "@/components/chat-window/chat-content";
import ChatFooter from "@/components/chat-window/chat-footer";
import TempChat from "@/components/chat-window/temp-chat";

const Chat = ({ className }: { className: string }) => {
  const authUser = useAuth().authUser!;
  const { currentChat, tempChat } = useStore();

  return (
    <div className={cn("flex flex-col bg-red-500/20", className)}>
      {tempChat ? (
        <TempChat user={tempChat} />
      ) : currentChat ? (
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
