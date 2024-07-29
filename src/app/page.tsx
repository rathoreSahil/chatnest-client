"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/auth-provider";
import { useSocket } from "@/context/socket-provider";

import LoggedInComponent from "@/components/main/logged-in-component";
import LoggedOutComponent from "@/components/main/logged-out-component";

export default function Home() {
  const socket = useSocket();
  const { authUser } = useAuth();

  useEffect(() => {
    if (!socket) return;

    if (authUser) {
      socket.connect();
    } else {
      socket.disconnect();
    }
    return () => {
      socket.disconnect();
    };
  }, [authUser, socket]);

  return <>{authUser ? <LoggedInComponent /> : <LoggedOutComponent />}</>;
}
