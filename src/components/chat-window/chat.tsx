"use client";

import { useStore } from "@/lib/zustand";
import ChatContent from "@/components/chat-window/chat-content";
import ChatFooter from "@/components/chat-window/chat-footer";
import ChatHeader from "@/components/chat-window/chat-header";

const Chat = () => {
  const currentChat = useStore((state) => state.currentChat);

  return (
    <div className="flex flex-col border-2 flex-[2]">
      {currentChat ? (
        <>
          <ChatHeader />
          <ChatContent />
          <ChatFooter />
        </>
      ) : (
        "Select a chat to start chatting!"
      )}
    </div>
  );
};

export default Chat;
