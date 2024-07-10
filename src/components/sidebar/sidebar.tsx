"use client";

import LogoutButton from "@/components/auth/logout-button";
import ChatList from "@/components/chat-window/chat-list";
import Search from "@/components/sidebar/search";

const Sidebar = () => {
  return (
    <div className="flex flex-col border-2 flex-[1]">
      <Search />
      <ChatList />
      <LogoutButton />
    </div>
  );
};

export default Sidebar;
