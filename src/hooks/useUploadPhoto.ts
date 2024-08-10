import { Fetch } from "@/lib/fetch";
import { useAuth } from "@/context/auth-provider";
import { useCallback, useState } from "react";

export const useUploadPhoto = (): {
  loading: boolean;
  uploadPhoto: (file: File) => Promise<User>;
} => {
  const authUser = useAuth().authUser!;
  const [loading, setLoading] = useState<boolean>(false);

  const uploadPhoto = useCallback(
    async (file: File): Promise<User> => {
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
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
          body: formData,
          credentials: "include",
        });

        const resJson = await res.json();
        return resJson.user;
      } catch (error: any) {
        console.error("Error uploading photo", error.message);
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    },
    [authUser.photoPublicId]
  );

  return { loading, uploadPhoto };
};
