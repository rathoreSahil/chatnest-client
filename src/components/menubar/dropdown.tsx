import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FaEllipsisVertical } from "react-icons/fa6";
import Logout from "@/components/auth/logout";
import { useStore } from "@/lib/zustand";

const Dropdown = () => {
  const setChatModalType = useStore((state) => state.setChatModalType);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none outline-none">
        <FaEllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => setChatModalType("select-group-members")}
        >
          New Group
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setChatModalType("profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
