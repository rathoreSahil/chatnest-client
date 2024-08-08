import { FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-provider";
import { useSidebarStore } from "@/states/sidebarStates";

import Dropdown from "@/components/sidebar/header/dropdown";
import ProfilePhoto from "@/components/profile/profile-photo";

const SidebarChatHeader = () => {
  const authUser = useAuth().authUser!;
  const { setSidebarType } = useSidebarStore();

  return (
    <div className="flex items-center justify-between px-5 py-3">
      <ProfilePhoto
        onClick={() => setSidebarType("profile")}
        className="h-10 w-10"
        src={authUser.photo}
      />
      <div>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={() => setSidebarType("new-chat")}
          className="rounded-full"
        >
          <FaPlus />
        </Button>
        <Dropdown />
      </div>
    </div>
  );
};

export default SidebarChatHeader;
