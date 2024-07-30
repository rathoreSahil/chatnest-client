import { Fetch } from "@/lib/fetch";
import { useState, useCallback } from "react";

export const useFetchChats = (): {
  loading: boolean;
  fetchChats: () => Promise<(GroupChat | DirectChat)[]>;
} => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchChats = useCallback(async (): Promise<
    (GroupChat | DirectChat)[]
  > => {
    try {
      const timeout = setTimeout(() => {
        setLoading(true);
      }, 100);
      const groupChatPromise = Fetch.GET("/chats/group");
      const directChatPromise = Fetch.GET("/chats/direct");

      const resJson = await Promise.all([groupChatPromise, directChatPromise]);

      const groupChats = resJson[0].data;
      const directChats = resJson[1].data;

      const allChats = [...groupChats, ...directChats];

      clearTimeout(timeout);
      return allChats;
    } catch (error: any) {
      console.error("Error fetching chats", error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, fetchChats };
};
