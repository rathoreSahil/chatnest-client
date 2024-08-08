import { Fetch } from "@/lib/fetch";
import { useCallback, useState } from "react";

export const useCreateDirectChat = (): {
  loading: boolean;
  createDirectChat: (
    messageContent: string,
    otherUserId: string
  ) => Promise<DirectChat>;
} => {
  const [loading, setLoading] = useState<boolean>(false);

  const createDirectChat = useCallback(
    async (
      messageContent: string,
      otherUserId: string
    ): Promise<DirectChat> => {
      try {
        setLoading(true);
        const newChatDetails = {
          user2: otherUserId,
          lastMessage: messageContent,
        };
        const resJson = await Fetch.POST("/chats/direct", newChatDetails);
        return resJson.data;
      } catch (error: any) {
        console.error(error);
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, createDirectChat };
};
