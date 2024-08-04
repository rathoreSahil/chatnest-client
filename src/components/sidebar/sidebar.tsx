"use client";

import { cn } from "@/lib/utils";
import { useStore } from "@/lib/zustand";

import Search from "@/components/sidebar/misc/search";
import SidebarHeader from "@/components/sidebar/header/sidebar-header";
import SidebarContent from "@/components/sidebar/content/sidebar-content";

const Sidebar = ({ className }: { className: string }) => {
  const { sidebarType } = useStore();

  return (
    <div className={cn("flex flex-col bg-green-500/50", className)}>
      <SidebarHeader />
      {sidebarType !== "profile" && <Search />}
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
