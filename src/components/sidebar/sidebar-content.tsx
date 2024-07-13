import { useStore } from "@/lib/zustand";
import ChatList from "./chat-list";
import UserList from "./user-list";
import GroupUserList from "./group-user-list";
import Profile from "./profile";

const SidebarContent = () => {
  const chatModalType = useStore((state) => state.chatModalType);

  if (chatModalType === "chat") return <ChatList />;
  if (chatModalType === "new-chat") return <UserList />;
  if (chatModalType === "new-group-chat") return <GroupUserList />;
  if (chatModalType === "profile") return <Profile />;
};

export default SidebarContent;
