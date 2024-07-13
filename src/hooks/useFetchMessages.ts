import { Fetch } from "@/lib/fetch";
import { Message } from "@/lib/types";
import { useState, useCallback } from "react";

const useFetchMessages = (): [
  boolean,
  (chatId: string) => Promise<Message[]>
] => {
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMessagesByChatId = useCallback(
    async (chatId: string): Promise<Message[]> => {
      try {
        setLoading(true);
        const resJson = await Fetch.GET(`/messages/${chatId}`);
        return resJson.data;
      } catch (error: any) {
        console.error("error fetching chats", error.messages);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return [loading, fetchMessagesByChatId];
};

export default useFetchMessages;
