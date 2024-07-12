import { Fetch } from "@/lib/fetch";
import { User } from "@/lib/types";
import { useState, useCallback } from "react";

const useFetchUsers = (): [boolean, () => Promise<User[]>] => {
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = useCallback(async (): Promise<User[]> => {
    try {
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
