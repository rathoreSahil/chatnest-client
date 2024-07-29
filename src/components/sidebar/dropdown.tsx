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
  const setSidebarType = useStore((state) => state.setSidebarType);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none outline-none">
        <FaEllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => setSidebarType("select-group-members")}
        >
          New Group
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSidebarType("profile")}>
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
