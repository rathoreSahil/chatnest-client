"use client";

import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebarStore } from "@/states/sidebarStates";

import Search from "@/components/sidebar/misc/search";
import SidebarHeader from "@/components/sidebar/header/sidebar-header";
import SidebarContent from "@/components/sidebar/content/sidebar-content";

const Sidebar = ({ className }: { className: string }) => {
  const { sidebarType } = useSidebarStore();

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={sidebarType}
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        transition={{ damping: 0, duration: 0.12 }}
        className={cn("flex flex-col", className)}
      >
        <SidebarHeader />
        {!["profile", "group-details"].includes(sidebarType) && <Search />}
        <SidebarContent />
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
