"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { MessageType } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-provider";
import { useChatStore } from "@/states/chatStates";
import { useSocket } from "@/context/socket-provider";
import { EmojiPicker } from "@/components/utils/emoji-picker";
import { addMessageToDB, isGroupChat, updateChat } from "@/lib/utils";

import toast from "react-hot-toast";

const ChatFooter = () => {
  const socket = useSocket();
  const authUser = useAuth().authUser!;

  const { currentChat } = useChatStore();
  const [messageContent, setMessageContent] = useState("");

  async function handleSend(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const chatId = currentChat!._id;
    const isGroup = isGroupChat(currentChat!);

    const messageData: MessageType = {
      content: messageContent,
      groupChat: undefined,
      directChat: undefined,
    };

    isGroup
      ? (messageData.groupChat = chatId)
      : (messageData.directChat = chatId);

    try {
      const addMessage = addMessageToDB(messageData);
      const updateChatLastMessage = updateChat(chatId, isGroup, {
        lastMessage: messageData.content,
      });
      const [message] = await Promise.all([addMessage, updateChatLastMessage]);
      if (!socket) throw new Error("Socket not connected");

      const populatedMessage: Message = { ...message, sender: authUser };
      socket.emit("message", populatedMessage);
    } catch (error: any) {
      toast.error("Error sending message", error.message);
    } finally {
      setMessageContent("");
    }
  }

  return (
    <>
      <form onSubmit={handleSend} className="flex gap-4 p-4">
        <EmojiPicker
          onChange={(value) => setMessageContent((prev) => prev + value)}
        />
        <Input
          value={messageContent}
          onChange={(event) => setMessageContent(event.target.value)}
          placeholder="Type a message..."
          className="rounded-xl focus-visible:ring-0"
        />
        <Button
          size={"icon"}
          type="submit"
          className="bg-primary p-2"
          disabled={messageContent.trim() === ""}
        >
          <Send />
        </Button>
      </form>
    </>
  );
};

export default ChatFooter;
