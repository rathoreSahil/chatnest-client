"use client";

import { useSocket } from "@/context/socket-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/zustand";
import { useAuth } from "@/context/auth-provider";
import { addMessageToDB } from "@/lib/utils";
import { Fetch } from "@/lib/fetch";
import { EmojiPicker } from "./emoji-picker";

const ChatFooter = () => {
  const [messageContent, setMessageContent] = useState("");

  const currentChat = useStore((state) => state.currentChat)!;
  const setCurrentChat = useStore((state) => state.setCurrentChat);

  const authUser = useAuth().authUser!;
  const socket = useSocket();

  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!socket) return;
    if (!messageContent) return;

    let message: Message = {
      sender: authUser,
      content: messageContent,
      createdAt: new Date(),
    };

    if ("_id" in currentChat === false) {
      // create new direct chat
      const newChatDetails = {
        user1: (currentChat as DirectChat).user1._id,
        user2: (currentChat as DirectChat).user2._id,
      };

      const res = await Fetch.POST("/chats/direct", newChatDetails);
      const newChat = res.data;

      // trigger refresh event to update chat list
      socket?.emit("refresh", newChat.user1);
      socket?.emit("refresh", newChat.user2);

      message.directChat = newChat._id;

      const { data: newChatPopulated } = await Fetch.GET(
        `/chats/direct/${newChat._id}`
      );
      setCurrentChat(newChatPopulated);
    } else {
      const isGroupChat = "participantCount" in currentChat;
      if (isGroupChat) {
        message.groupChat = currentChat._id;
      } else {
        message.directChat = currentChat._id;
      }
    }

    addMessageToDB(message);
    socket.emit("message", message);
    setMessageContent("");
  }

  return (
    <form onSubmit={handleSend} className="flex gap-4 p-4 bg-slate-800 border">
      <EmojiPicker
        onChange={(value) => setMessageContent((prev) => prev + value)}
      />
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
