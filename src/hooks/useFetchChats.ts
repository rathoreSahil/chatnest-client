import { Fetch } from "@/lib/fetch";
import { Chat } from "@/lib/types";
import { useState, useCallback } from "react";
import { set } from "react-hook-form";

const useFetchChats = (): [boolean, (userId: string) => Promise<Chat[]>] => {
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChatsByUserId = useCallback(
    async (userId: string): Promise<Chat[]> => {
      try {
        setLoading(true);
        const resJson = await Fetch.GET(`/chats/${userId}`);
        return resJson.data;
      } catch (error: any) {
        console.error("error fetching chats", error.message);
        return [];
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return [loading, fetchChatsByUserId];
};

export default useFetchChats;