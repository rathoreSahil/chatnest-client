import { Fetch } from "@/lib/fetch";
import { wait } from "@/lib/utils";
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
        await wait(5000);
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
