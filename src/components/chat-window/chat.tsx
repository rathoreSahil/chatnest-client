"use client";

import { useStore } from "@/lib/zustand";
import ChatContent from "@/components/chat-window/chat-content";
import ChatFooter from "@/components/chat-window/chat-footer";
import ChatHeader from "@/components/chat-window/chat-header";

const Chat = () => {
  const currentChat = useStore((state) => state.currentChat);

  return (
    <div className="flex flex-col bg-gray-900 h-full">
      {currentChat ? (
        <>
          <ChatHeader />
          <ChatContent />
          <ChatFooter />
        </>
      ) : (
        <div className="text-center my-auto">
          Welcome to Chatnest.
          <br />
          Select a chat to start chatting!
        </div>
      )}
    </div>
  );
};

export default Chat;
