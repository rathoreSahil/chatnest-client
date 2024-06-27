"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const router = useRouter();

  async function handleLogout() {
    try {
      const response = await fetch(
        "http://localhost:3182/api/v1/users/logout",
        {
          credentials: "include",
        }
      );
      if (response.ok) {
        toast.success("Logged out successfully!");
      } else {
        toast.error("An unexpected error occurred!");
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  }

  return <Button onClick={handleLogout}>LogOut</Button>;
};

export default LogoutButton;
