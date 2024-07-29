import { useStore } from "@/lib/zustand";
import { Button } from "@/components/ui/button";
import { IoArrowBackSharp } from "react-icons/io5";

const SidebarTitleHeader = () => {
  const { sidebarType, setSidebarType } = useStore();

  let title = "";
  switch (sidebarType) {
    case "new-chat":
      title = "New Chat";
      break;
    case "select-group-members":
      title = "Add Group Members";
      break;
    case "group-details":
      title = "New Group";
      break;
    case "profile":
      title = "Profile";
      break;
    default:
      title = "Invalid Sidebar Type";
  }

  return (
    <div className="flex items-center justify-start gap-2">
      <Button onClick={() => setSidebarType("chat")}>
        <IoArrowBackSharp className="text-xl " />
      </Button>
      <span className="text-xl">{title}</span>
    </div>
  );
};

export default SidebarTitleHeader;
