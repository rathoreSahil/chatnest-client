"use client";

import { useAuth } from "@/context/auth-provider";
import Sidebar from "@/components/sidebar";
import Chat from "@/components/chat";
import LoginSignupButtons from "@/components/loginSignup-buttons";
import LogoutButton from "@/components/logout-button";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <div className="flex justify-center gap-4 p-4">
        <LoginSignupButtons />
        <LogoutButton />
      </div>
      <div className="flex">
        <Sidebar />
        <Chat />
      </div>
    </>
  );
}
