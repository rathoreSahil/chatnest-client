"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/auth-provider";
import { useSocket } from "@/context/socket-provider";
import { useFetchChats } from "@/hooks/useFetchChats";

import LoggedInComponent from "@/components/main/logged-in-component";
import LoggedOutComponent from "@/components/main/logged-out-component";
import { useStore } from "@/lib/zustand";

export default function Home() {
  const socket = useSocket();
  const { authUser } = useAuth();
  const { setChats } = useStore();
  const { fetchChats } = useFetchChats();

  useEffect(() => {
    if (!socket) return;

    async function loadChats() {
      if (!socket) return;
      const chats = await fetchChats();
      chats.map((chat) => {
        socket.emit("join-room", chat._id);
      });
      setChats(chats);
    }

    if (authUser) {
      socket.connect();
      loadChats();
    } else {
      socket.disconnect();
      setChats([]);
    }
    return () => {
      socket.disconnect();
      setChats([]);
    };
  }, [authUser, fetchChats, setChats, socket]);

  return <>{authUser ? <LoggedInComponent /> : <LoggedOutComponent />}</>;
}
