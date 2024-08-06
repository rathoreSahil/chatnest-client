import { Fetch } from "@/lib/fetch";
import { useCallback, useState } from "react";

export const useDeleteGroupPhoto = (): {
  loading: boolean;
  deleteGroupPhoto: (groupChat: GroupChat) => Promise<GroupChat>;
} => {
  const [loading, setLoading] = useState(false);

  const deleteGroupPhoto = useCallback(
    async (groupChat: GroupChat): Promise<GroupChat> => {
      try {
        setLoading(true);
        const resJson = await Fetch.DELETE(
          `/chats/group/${groupChat._id}/photo`
        );
        return resJson.data;
      } catch (error: any) {
        console.error("Error deleting group photo", error.message);
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, deleteGroupPhoto };
};
