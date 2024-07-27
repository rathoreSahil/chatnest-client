import { Fetch } from "@/lib/fetch";
import { useState, useCallback } from "react";

export const useFetchUsers = (): [boolean, () => Promise<User[]>] => {
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
      console.error("Error fetching users", error.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  return [loading, fetchUsers];
};
