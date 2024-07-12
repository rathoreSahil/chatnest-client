"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-provider";
import { Fetch } from "@/lib/fetch";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdOutlineLogout } from "react-icons/md";

const LogoutButton = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  async function handleLogout() {
    try {
      await Fetch.GET("/users/logout");
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error: any) {
      toast.error(error.message);
      console.error("An unexpected error occurred:", error);
    }
  }

  return (
    <Button className="w-min" onClick={handleLogout}>
      <MdOutlineLogout />
    </Button>
  );
};

export default LogoutButton;
