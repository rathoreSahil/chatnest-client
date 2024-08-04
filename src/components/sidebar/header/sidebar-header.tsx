import { useStore } from "@/lib/zustand";

import SidebarChatHeader from "@/components/sidebar/header/sidebar-chat-header";
import SidebarTitleHeader from "@/components/sidebar/header/sidebar-title-header";

const SidebarHeader = () => {
  const { sidebarType } = useStore();

  return (
    <>
      {sidebarType === "chat" ? <SidebarChatHeader /> : <SidebarTitleHeader />}
    </>
  );
};

export default SidebarHeader;
