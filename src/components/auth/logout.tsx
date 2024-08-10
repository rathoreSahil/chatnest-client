"use client";

import toast from "react-hot-toast";
import { Fetch } from "@/lib/fetch";
import { useAuth } from "@/context/auth-provider";

const Logout = () => {
  const { setAuthUser } = useAuth();

  async function handleLogout() {
    try {
      // await Fetch.GET("/users/logout");
      localStorage.removeItem("jwt");
      setAuthUser(null);
      toast.success("Logged out successfully!");
    } catch (error: any) {
      toast.error(error.message);
      console.error("An unexpected error occurred:", error);
    }
  }

  return <div onClick={handleLogout}>Logout</div>;
};

export default Logout;
