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
import { Message } from "@/lib/types";

const ChatFooter = () => {
  const [messageContent, setMessageContent] = useState("");
  const socket = useSocket();
  const currentChat = useStore((state) => state.currentChat);
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const { user: currentUser } = useAuth();

  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!socket) return;
    if (!messageContent) return;

    let message: Message = {} as Message;
    if ("email" in currentChat!) {
      const otherUser = JSON.parse(JSON.stringify(currentChat));

      // create new chat
      const newChatDetails = { name: `${currentUser?.name}-${otherUser.name}` };
      const res = await Fetch.POST("/chats", newChatDetails);
      const newChat = res.data;
      const newChatId = res.data._id;

      // create 2 participants for the chat - currentUser and user
      const newParticipantsData = {
        participants: [
          { chat: newChatId, user: currentUser?._id },
          { chat: newChatId, user: otherUser._id },
        ],
      };
      await Fetch.POST("/participants", newParticipantsData);

      // trigger refresh event to update chat list
      socket?.emit("refresh", currentUser?._id);
      socket?.emit("refresh", otherUser._id);

      message = {
        chat: newChat!._id,
        sender: currentUser!._id,
        content: messageContent,
        createdAt: new Date(),
      };

      setCurrentChat(newChat);
    } else {
      message = {
        chat: currentChat!._id,
        sender: currentUser!._id,
        content: messageContent,
        createdAt: new Date(),
      };
    }

    addMessageToDB(message);
    socket.emit("message", message);
    setMessageContent("");
  }

  return (
    <form onSubmit={handleSend} className="flex gap-4 p-4 bg-slate-800 border">
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
