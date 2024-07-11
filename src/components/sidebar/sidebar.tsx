"use client";

import ChatList from "@/components/sidebar/chat-list";
import Search from "@/components/sidebar/search";
import Menubar from "@/components/menubar/menubar";

const Sidebar = () => {
  return (
    <div className="flex flex-col border-x flex-[9]">
      <Menubar />
      <Search />
      <ChatList />
    </div>
  );
};

export default Sidebar;
