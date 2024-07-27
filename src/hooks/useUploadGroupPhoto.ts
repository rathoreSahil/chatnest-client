import { Fetch } from "@/lib/fetch";
import { useCallback, useState } from "react";

const useUploadGroupPhoto = (): [
  boolean,
  (groupChat: GroupChat, file: File) => Promise<GroupChat | undefined>
] => {
  const [loading, setLoading] = useState<boolean>(false);

  const uploadGroupPhoto = useCallback(
    async (
      groupChat: GroupChat,
      file: File
    ): Promise<GroupChat | undefined> => {
      try {
        setLoading(true);

        if (groupChat.photoPublicId) {
          Fetch.DELETE(`/chats/group/${groupChat._id}/photo`);
        }

        const formData = new FormData();
        formData.append("photo", file);

        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(
          `${API_URL}/chats/group/${groupChat._id}/photo`,
          {
            method: "PATCH",
            body: formData,
            credentials: "include",
          }
        );

        const resJson = await res.json();
        return resJson.data;
      } catch (error: any) {
        console.error("Error uploading group photo", error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return [loading, uploadGroupPhoto];
};

export default useUploadGroupPhoto;
