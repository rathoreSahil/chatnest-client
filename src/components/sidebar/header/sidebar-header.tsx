import { useSidebarStore } from "@/states/sidebarStates";
import SidebarChatHeader from "@/components/sidebar/header/sidebar-chat-header";
import SidebarTitleHeader from "@/components/sidebar/header/sidebar-title-header";

const SidebarHeader = () => {
  const { sidebarType } = useSidebarStore();

  return (
    <>
      {sidebarType === "chat" ? <SidebarChatHeader /> : <SidebarTitleHeader />}
    </>
  );
};

export default SidebarHeader;
