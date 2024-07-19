import { Fetch } from "@/lib/fetch";
import { wait } from "@/lib/utils";
import { useState, useCallback } from "react";

const useFetchChats = (): [boolean, () => Promise<Chat[]>] => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchChats = useCallback(async (): Promise<Chat[]> => {
    try {
      const timeout = setTimeout(() => {
        setLoading(true);
      }, 100);
      const resJson = await Fetch.GET("/chats");

      clearTimeout(timeout);
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
