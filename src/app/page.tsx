"use client";

import { useAuth } from "@/context/auth-provider";
import { useEffect } from "react";

import { useSocket } from "@/context/socket-provider";
import LoggedInComponent from "@/components/auth/logged-in-component";
import LoggedOutComponent from "@/components/auth/logged-out-component";

export default function Home() {
  const { user } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;

    if (user) {
      socket.connect();
    } else {
      socket.disconnect();
    }
    return () => {
      socket.disconnect();
    };
  }, [user, socket]);

  return <>{user ? <LoggedInComponent /> : <LoggedOutComponent />}</>;
}
