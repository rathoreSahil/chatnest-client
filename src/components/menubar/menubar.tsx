import { useStore } from "@/lib/zustand";
import { FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import Dropdown from "@/components/menubar/dropdown";
import MenuHeader from "./menu-header";
import ProfilePhoto from "../profile/profile-photo";
import { useAuth } from "@/context/auth-provider";

const Menubar = () => {
  const chatModalType = useStore((state) => state.chatModalType);
  const setChatModalType = useStore((state) => state.setChatModalType);
  const { user } = useAuth();

  if (chatModalType === "chat") {
    return (
      <div className="flex items-center justify-between p-3 bg-black border">
        <div onClick={() => setChatModalType("profile")}>
          <ProfilePhoto
            className="cursor-pointer h-10 w-10"
            src={user?.photo}
          />
        </div>
        <div>
          <Button
            size={"sm"}
            variant="base"
            onClick={() => setChatModalType("new-chat")}
            className="rounded-lg "
          >
            <FaPlus className="text-white" />
          </Button>
          <Dropdown />
        </div>
      </div>
    );
  }

  let title = "";
  if (chatModalType === "new-chat") {
    title = "New Chat";
  } else if (chatModalType === "new-group-chat") {
    title = "New Group Chat";
  } else if (chatModalType === "profile") {
    title = "Profile";
  }

  return <MenuHeader title={title} />;
};

export default Menubar;
