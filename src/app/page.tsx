"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/auth-provider";
import { useSocket } from "@/context/socket-provider";
import { useFetchChats } from "@/hooks/useFetchChats";
import { useChatListStore } from "@/states/chatListState";

import toast from "react-hot-toast";
import LoggedInComponent from "@/components/main/logged-in-component";
import LoggedOutComponent from "@/components/main/logged-out-component";

const Home = () => {
  const socket = useSocket();
  const { authUser } = useAuth();
  const { setChats } = useChatListStore();
  const { fetchChats } = useFetchChats();

  useEffect(() => {
    if (!socket) return;

    async function loadChats() {
      if (!socket) return;
      try {
        const chats = await fetchChats();
        chats.map((chat) => {
          socket.emit("join-room", chat._id);
        });
        setChats(chats);
      } catch (error: any) {
        console.error("Error loading chats", error.message);
        toast.error("Error loading chats");
      }
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
};

export default Home;
