"use client";

import { useStore } from "@/lib/zustand";
import ChatContent from "@/components/chat-window/chat-content";
import ChatFooter from "@/components/chat-window/chat-footer";
import ChatHeader from "@/components/chat-window/chat-header";
import { useAuth } from "@/context/auth-provider";

const Chat = () => {
  const authUser = useAuth().authUser!;
  const currentChat = useStore((state) => state.currentChat);

  return (
    <div className="flex flex-col bg-gray-950 h-full">
      {currentChat ? (
        <>
          <ChatHeader />
          <ChatContent />
          <ChatFooter />
        </>
      ) : (
        <div className="text-center my-auto">
          <p className="text-6xl pb-6 text-green-400">{authUser.name}</p>
          <p>
            Welcome to Chatnest. <br />
            Select a chat to start chatting!
          </p>
        </div>
      )}
    </div>
  );
};

export default Chat;
