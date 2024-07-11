import { useState } from "react";

const useFetchUsers = () => {
  const [loading, setLoading] = useState<Boolean>(true);

  async function fetchUsers() {
    try {
      const res = await fetch("http://localhost:3182/api/v1/users");
      const resJson = await res.json();

      return resJson.data;
    } catch (error) {
      console.error("error fetching users", error);
      return [];
    } finally {
      setLoading(false);
    }
  }

  return [loading, fetchUsers];
};

export default useFetchUsers;
