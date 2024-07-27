import { Fetch } from "@/lib/fetch";
import { useCallback, useState } from "react";

const useDeletePhoto = (): [boolean, () => Promise<User | undefined>] => {
  const [loading, setLoading] = useState(false);

  const deletePhoto = useCallback(async (): Promise<User | undefined> => {
    try {
      setLoading(true);
      const resJson = await Fetch.DELETE("/users/photo");
      return resJson.user;
    } catch (error: any) {
      console.error("Error deleting photo", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return [loading, deletePhoto];
};

export default useDeletePhoto;
