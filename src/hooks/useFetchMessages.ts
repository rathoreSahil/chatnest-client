import { Fetch } from "@/lib/fetch";
import { wait } from "@/lib/utils";
import { useState, useCallback } from "react";

const useFetchMessages = (): [
  boolean,
  (chatId: string) => Promise<Message[]>
] => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMessagesByChatId = useCallback(
    async (chatId: string): Promise<Message[]> => {
      try {
        const timeout = setTimeout(() => {
          setLoading(true);
        }, 100);

        const resJson = await Fetch.GET(`/messages/${chatId}`);

        clearTimeout(timeout);
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
