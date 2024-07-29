import { useStore } from "@/lib/zustand";

import SidebarChatHeader from "@/components/sidebar/sidebar-chat-header";
import SidebarTitleHeader from "@/components/sidebar/sidebar-title-header";

const SidebarHeader = () => {
  const { sidebarType } = useStore();

  return (
    <div className="p-3">
      {sidebarType === "chat" ? <SidebarChatHeader /> : <SidebarTitleHeader />}
    </div>
  );
};

export default SidebarHeader;
