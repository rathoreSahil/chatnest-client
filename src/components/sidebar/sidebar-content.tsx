import { useStore } from "@/lib/zustand";

import Profile from "@/components/sidebar/profile";
import NewChat from "@/components/sidebar/new-chat";
import ChatList from "@/components/sidebar/chat-list";
import GroupUserList from "@/components/sidebar/group-user-list";
import NewGroupDetails from "@/components/sidebar/new-group-details";

const SidebarContent = () => {
  const sidebarType = useStore((state) => state.sidebarType);

  switch (sidebarType) {
    case "chat":
      return <ChatList />;
    case "new-chat":
      return <NewChat />;
    case "select-group-members":
      return <GroupUserList />;
    case "group-details":
      return <NewGroupDetails />;
    case "profile":
      return <Profile />;
    default:
      return <p>Oops! Something went wrong</p>;
  }
};

export default SidebarContent;
