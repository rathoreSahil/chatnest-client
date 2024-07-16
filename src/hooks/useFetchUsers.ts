import { Fetch } from "@/lib/fetch";
import { useState, useCallback } from "react";

const useFetchUsers = (): [boolean, () => Promise<User[]>] => {
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = useCallback(async (): Promise<User[]> => {
    try {
      setLoading(true);
      const resJson = await Fetch.GET("/users");
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
