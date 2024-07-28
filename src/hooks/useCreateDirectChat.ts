import { Fetch } from "@/lib/fetch";
import { useStore } from "@/lib/zustand";
import { useCallback, useState } from "react";

const useCreateDirectChat = (): {
  loading: boolean;
  createDirectChat: (messageContent: string) => Promise<DirectChat | undefined>;
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const currentChat = useStore((state) => state.currentChat);

  const createDirectChat = useCallback(
    async (messageContent: string): Promise<DirectChat | undefined> => {
      try {
        setLoading(true);

        // create new direct chat
        const newChatDetails = {
          user1: (currentChat as DirectChat).user1._id,
          user2: (currentChat as DirectChat).user2._id,
          lastMessage: messageContent,
        };

        const res = await Fetch.POST("/chats/direct", newChatDetails);
        const newChat = res.data;

        const { data: newChatPopulated } = await Fetch.GET(
          `/chats/direct/${newChat._id}`
        );

        return newChatPopulated;
      } catch (error) {
        throw new Error("Error creating direct chat");
      } finally {
        setLoading(false);
      }
    },
    [currentChat]
  );

  return { loading, createDirectChat };
};

export default useCreateDirectChat;
