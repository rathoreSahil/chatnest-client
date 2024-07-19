"use client";

import Search from "@/components/sidebar/search";
import Menubar from "@/components/menubar/menubar";
import { useStore } from "@/lib/zustand";
import SidebarContent from "@/components/sidebar/sidebar-content";

const Sidebar = () => {
  const chatModalType = useStore((state) => state.chatModalType);

  return (
    <div className="flex flex-col border-x h-full">
      <Menubar />
      {chatModalType !== "profile" && <Search />}
      <div className="flex-1 overflow-y-auto">
        <SidebarContent />
      </div>
    </div>
  );
};

export default Sidebar;
