import Profile from "@/components/sidebar/content/profile";
import NewChat from "@/components/sidebar/content/new-chat";
import ChatList from "@/components/sidebar/content/chat-list";
import GroupUserList from "@/components/sidebar/content/group-user-list";
import NewGroupDetails from "@/components/sidebar/content/new-group-details";

import { useSidebarStore } from "@/states/sidebarStates";

const SidebarContent = () => {
  const { sidebarType } = useSidebarStore();

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
