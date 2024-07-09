"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";

const LogoutButton = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  async function handleLogout() {
    try {
      const response = await fetch(
        "http://localhost:3182/api/v1/users/logout",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        setUser(null);
        toast.success("Logged out successfully!");
        window.location.reload();
      } else {
        toast.error("An unexpected error occurred!");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  }

  return (
    <Button className="rounded-full" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
