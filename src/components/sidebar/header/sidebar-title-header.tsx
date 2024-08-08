import { IoArrowBackSharp } from "react-icons/io5";
import { useSidebarStore } from "@/states/sidebarStates";

const SidebarTitleHeader = () => {
  const { sidebarType, setSidebarType } = useSidebarStore();

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
    <div className="flex items-center justify-start gap-4 text-xl px-5 py-3">
      <IoArrowBackSharp
        className="cursor-pointer"
        onClick={() => setSidebarType("chat")}
      />
      <p>{title}</p>
    </div>
  );
};

export default SidebarTitleHeader;
