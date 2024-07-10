"use client";

import { useSocket } from "@/context/socket-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/zustand";

const ChatFooter = () => {
  const [message, setMessage] = useState("");
  const socket = useSocket();
  const currentChat = useStore((state) => state.currentChat);

  function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("message", message);
    if (!socket) return;
    if (!message) return;
    socket.emit("message", message, currentChat);
    setMessage("");
  }

  return (
    <form onSubmit={handleSend} className="flex gap-4 p-4">
      <Input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
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
