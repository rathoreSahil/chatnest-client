import { useStore } from "@/lib/zustand";
import { FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import Dropdown from "@/components/menubar/dropdown";
import MenuHeader from "./menu-header";

const Menubar = () => {
  const chatModalType = useStore((state) => state.chatModalType);
  const setChatModalType = useStore((state) => state.setChatModalType);

  if (chatModalType === "chat") {
    return (
      <div className="flex items-center justify-end gap-2 p-3 bg-black border">
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
