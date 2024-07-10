"use client";

import { useSocket } from "@/context/socket-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/zustand";
import { useAuth } from "@/context/auth-provider";
import { addMessageToDB } from "@/lib/utils";

const ChatFooter = () => {
  const [messageContent, setMessageContent] = useState("");
  const socket = useSocket();
  const currentChat = useStore((state) => state.currentChat);
  const { user } = useAuth();

  function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!socket) return;
    if (!messageContent) return;

    const message = {
      chat: currentChat!._id,
      sender: user!._id,
      content: messageContent,
      createdAt: new Date(),
    };

    console.log("message", message);
    addMessageToDB(message);
    socket.emit("message", message);
    setMessageContent("");
  }

  return (
    <form onSubmit={handleSend} className="flex gap-4 p-4">
      <Input
        value={messageContent}
        onChange={(event) => setMessageContent(event.target.value)}
        placeholder="Type a message..."
        className="rounded-xl"
      />
      <Button type="submit" size="icon">
        <SendHorizontal />
      </Button>
    </form>
  );
};

export default ChatFooter;
