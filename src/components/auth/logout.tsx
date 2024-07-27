"use client";

import { useAuth } from "@/context/auth-provider";
import { Fetch } from "@/lib/fetch";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Logout = () => {
  const router = useRouter();
  const { setAuthUser } = useAuth();

  async function handleLogout() {
    try {
      await Fetch.GET("/users/logout");
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
