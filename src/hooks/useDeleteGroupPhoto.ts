import { Fetch } from "@/lib/fetch";
import { useCallback, useState } from "react";

const useDeleteGroupPhoto = (): [
  boolean,
  (groupChat: GroupChat) => Promise<GroupChat | undefined>
] => {
  const [loading, setLoading] = useState(false);

  const deleteGroupPhoto = useCallback(
    async (groupChat: GroupChat): Promise<GroupChat | undefined> => {
      try {
        setLoading(true);
        const resJson = await Fetch.DELETE(
          `/chats/group/${groupChat._id}/photo`
        );
        return resJson.data;
      } catch (error: any) {
        console.error("Error deleting group photo", error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return [loading, deleteGroupPhoto];
};

export default useDeleteGroupPhoto;
