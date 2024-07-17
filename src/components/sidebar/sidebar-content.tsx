import { useStore } from "@/lib/zustand";
import ChatList from "./chat-list";
import GroupUserList from "./group-user-list";
import Profile from "./profile";
import NewChat from "./new-chat";
import NewGroupDetails from "./new-group-details";

const SidebarContent = () => {
  const chatModalType = useStore((state) => state.chatModalType);

  if (chatModalType === "chat") return <ChatList />;
  if (chatModalType === "new-chat") return <NewChat />;
  if (chatModalType === "select-group-members") return <GroupUserList />;
  if (chatModalType === "group-details") return <NewGroupDetails />;
  if (chatModalType === "profile") return <Profile />;
};

export default SidebarContent;
