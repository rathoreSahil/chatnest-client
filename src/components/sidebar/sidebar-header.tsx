import { useStore } from "@/lib/zustand";

import SidebarChatHeader from "@/components/sidebar/sidebar-chat-header";
import SidebarTitleHeader from "@/components/sidebar/sidebar-title-header";

const SidebarHeader = () => {
  const { sidebarType } = useStore();

  return (
    <>
      {sidebarType === "chat" ? <SidebarChatHeader /> : <SidebarTitleHeader />}
    </>
  );
};

export default SidebarHeader;
