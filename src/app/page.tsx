"use client";

import { useAuth } from "@/context/auth-provider";
import { useEffect } from "react";

import LoggedInComponent from "@/components/logged-in-component";
import LoggedOutComponent from "@/components/logged-out-component";
import { useSocket } from "@/context/socket-provider";

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
