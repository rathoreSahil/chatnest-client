import { FaEllipsisVertical } from "react-icons/fa6";
import { useSidebarStore } from "@/states/sidebarStates";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "@/components/auth/logout";

const Dropdown = () => {
  const { setSidebarType } = useSidebarStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none focus-visible:outline-none">
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
