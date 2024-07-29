"use client";

import { cn } from "@/lib/utils";
import { SidebarProps } from "@/types";
import { useStore } from "@/lib/zustand";

import Search from "@/components/sidebar/search";
import SidebarHeader from "@/components/sidebar/sidebar-header";
import SidebarContent from "@/components/sidebar/sidebar-content";

const Sidebar = ({ className }: SidebarProps) => {
  const { sidebarType } = useStore();

  return (
    <div className={cn("", className)}>
      <SidebarHeader />
      {sidebarType !== "profile" && <Search />}
      <SidebarContent />
    </div>
  );
};

export default Sidebar;
