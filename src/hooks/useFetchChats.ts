import { Fetch } from "@/lib/fetch";
import { wait } from "@/lib/utils";
import { useState, useCallback } from "react";

const useFetchChats = (): [boolean, () => Promise<Chat[]>] => {
  const [loading, setLoading] = useState<boolean>(true);

  const fetchChats = useCallback(async (): Promise<Chat[]> => {
    try {
      setLoading(true);
      const resJson = await Fetch.GET("/chats");
      return resJson.data;
    } catch (error: any) {
      console.error("error fetching chats", error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return [loading, fetchChats];
};

export default useFetchChats;
