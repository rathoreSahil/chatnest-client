import { useState } from "react";
import { MessageType } from "@/types";
import { useStore } from "@/lib/zustand";
import { addMessageToDB } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-provider";
import { useSocket } from "@/context/socket-provider";
import { EmojiPicker } from "@/components/utils/emoji-picker";
import { useCreateDirectChat } from "@/hooks/useCreateDirectChat";

import toast from "react-hot-toast";
import ProfilePhoto from "@/components/profile/profile-photo";

const TempChat = ({ user }: { user: User }) => {
  const socket = useSocket();
  const authUser = useAuth().authUser!;
  const [messageContent, setMessageContent] = useState("");

  const { createDirectChat } = useCreateDirectChat();
  const { setTempChat, setCurrentChat, setIsRightPanelOpen } = useStore();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // create new chat
    try {
      const newDirectChat = await createDirectChat(messageContent, user._id);
      const newChatPopulated = {
        ...newDirectChat,
        user1: authUser,
        user2: user,
      };

      const messageData: MessageType = {
        content: messageContent,
        directChat: newDirectChat._id,
      };

      const message = await addMessageToDB(messageData);
      const populatedMessage: Message = { ...message, sender: authUser };

      setCurrentChat(newChatPopulated);
      setTempChat(null);

      if (!socket) throw new Error("Socket not connected");
      socket.emit("message", populatedMessage);
      socket.emit("new-chat-self", newChatPopulated);
      socket.emit("new-chat", user._id, newChatPopulated);
    } catch (error: any) {
      toast.error("Something went wrong", error.message);
    }
  }

  return (
    <>
      <div
        onClick={() => setIsRightPanelOpen(true)}
        className="flex items-center gap-4 cursor-pointer text-xl px-5 py-3"
      >
        <ProfilePhoto src={user.photo} className="h-10 w-10" />
        {user.name}
      </div>
      <div className="flex-1"></div>
      <form onSubmit={handleSubmit} className="flex gap-4 p-4">
        <EmojiPicker
          onChange={(value) => setMessageContent((prev) => prev + value)}
        />
        <Input
          value={messageContent}
          onChange={(event) => setMessageContent(event.target.value)}
          placeholder="Type a message..."
          className="rounded-xl"
        />
      </form>
    </>
  );
};

export default TempChat;
