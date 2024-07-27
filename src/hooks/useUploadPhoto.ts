import { useAuth } from "@/context/auth-provider";
import { Fetch } from "@/lib/fetch";
import { useCallback, useState } from "react";

const useUploadPhoto = (): [
  boolean,
  (file: File) => Promise<User | undefined>
] => {
  const [loading, setLoading] = useState<boolean>(false);
  const authUser = useAuth().authUser!;
  const uploadPhoto = useCallback(
    async (file: File): Promise<User | undefined> => {
      try {
        setLoading(true);
        if (authUser.photoPublicId) {
          Fetch.DELETE("/users/photo");
        }

        const formData = new FormData();
        formData.append("photo", file);

        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/users/photo`, {
          method: "PATCH",
          body: formData,
          credentials: "include",
        });

        const resJson = await res.json();
        return resJson.user;
      } catch (error: any) {
        console.error("Error uploading photo", error.message);
      } finally {
        setLoading(false);
      }
    },
    [authUser.photoPublicId]
  );

  return [loading, uploadPhoto];
};

export default useUploadPhoto;
