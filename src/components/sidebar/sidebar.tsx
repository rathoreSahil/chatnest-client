"use client";

import ChatList from "@/components/sidebar/chat-list";
import Search from "@/components/sidebar/search";
import Menubar from "@/components/menubar/menubar";
import { useStore } from "@/lib/zustand";
import UserList from "@/components/sidebar/user-list";

const Sidebar = () => {
  const isNewChatModalOpen = useStore((state) => state.isNewChatModalOpen);

  return (
    <div className="flex flex-col border-x">
      <Menubar />
      <Search />
      {isNewChatModalOpen ? <UserList /> : <ChatList />}
    </div>
  );
};

export default Sidebar;
