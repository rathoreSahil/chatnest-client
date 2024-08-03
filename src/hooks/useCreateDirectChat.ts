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
    async (messageContent: string) => {
      try {
        setLoading(true);

        // create new direct chat
        return currentChat;
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
