import { Fetch } from "@/lib/fetch";
import { useCallback, useState } from "react";

const useDeletePhoto = (): {
  loading: boolean;
  deletePhoto: () => Promise<User>;
} => {
  const [loading, setLoading] = useState(false);

  const deletePhoto = useCallback(async (): Promise<User> => {
    try {
      setLoading(true);
      const resJson = await Fetch.DELETE("/users/photo");
      return resJson.user;
    } catch (error: any) {
      console.error("Error deleting photo", error.message);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, deletePhoto };
};

export default useDeletePhoto;
