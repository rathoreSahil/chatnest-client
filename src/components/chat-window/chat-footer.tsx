"use client";

import { useSocket } from "@/context/socket-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/lib/zustand";
import { useAuth } from "@/context/auth-provider";
import { addMessageToDB, updateChat } from "@/lib/utils";
import { EmojiPicker } from "./emoji-picker";
import useCreateDirectChat from "@/hooks/useCreateDirectChat";
import toast from "react-hot-toast";

const ChatFooter = () => {
  const [messageContent, setMessageContent] = useState("");
  const { loading, createDirectChat } = useCreateDirectChat();

  const currentChat = useStore((state) => state.currentChat)!;
  const setCurrentChat = useStore((state) => state.setCurrentChat);

  const authUser = useAuth().authUser!;
  const socket = useSocket();

  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!socket) return;
    if (!messageContent) return;

    let message = {
      sender: authUser,
      content: messageContent,
    };

    let chatId = currentChat._id;
    let isGroupChat = false;

    if ("_id" in currentChat === false) {
      try {
        // Create a new chat
        const newDirectChat = await createDirectChat(message.content);
        if (!newDirectChat) return;

        chatId = newDirectChat._id;
        isGroupChat = false;
        // trigger refresh event to update chat list
        const otherUserId =
          newDirectChat.user1._id === authUser._id
            ? newDirectChat.user2._id
            : newDirectChat.user1._id;
        socket.emit("new-chat", otherUserId, newDirectChat);
        socket.emit("new-chat-self", newDirectChat);

        message.directChat = newDirectChat._id;
        setCurrentChat(newDirectChat);
      } catch (error: any) {
        toast.error(error.message);
        console.error(error.message);
      }
    } else {
      isGroupChat = "participantCount" in currentChat;
      if (isGroupChat) {
        message.groupChat = currentChat._id;
      } else {
        message.directChat = currentChat._id;
      }
    }

    try {
      await addMessageToDB(message);
      updateChat(chatId, isGroupChat, { lastMessage: message.content });
      socket.emit("message", message);
    } catch (error: any) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setMessageContent("");
    }
  }

  return (
    <form onSubmit={handleSend} className="flex gap-4 p-4 border">
      <EmojiPicker
        onChange={(value) => setMessageContent((prev) => prev + value)}
      />
      <Input
        value={messageContent}
        onChange={(event) => setMessageContent(event.target.value)}
        placeholder="Type a message..."
        className="rounded-xl"
      />
      <Button disabled={loading} type="submit" size="icon">
        <SendHorizontal />
      </Button>
    </form>
  );
};

export default ChatFooter;
