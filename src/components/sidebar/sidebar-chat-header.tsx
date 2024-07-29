import { FaPlus } from "react-icons/fa";
import { useStore } from "@/lib/zustand";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-provider";

import Dropdown from "@/components/sidebar/dropdown";
import ProfilePhoto from "@/components/profile/profile-photo";

const SidebarChatHeader = () => {
  const authUser = useAuth().authUser!;
  const { setSidebarType } = useStore();

  return (
    <div className="flex items-center justify-between">
      <ProfilePhoto
        onClick={() => setSidebarType("profile")}
        className="cursor-pointer h-10 w-10"
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
