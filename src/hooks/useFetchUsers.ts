import { Fetch } from "@/lib/fetch";
import { useState, useCallback } from "react";

const useFetchUsers = (): [boolean, () => Promise<User[]>] => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUsers = useCallback(async (): Promise<User[]> => {
    try {
      const timeout = setTimeout(() => {
        setLoading(true);
      }, 100);
      const resJson = await Fetch.GET("/users");

      clearTimeout(timeout);
      return resJson.data;
    } catch (error: any) {
      console.error("error fetching users", error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return [loading, fetchUsers];
};

export default useFetchUsers;
