import { useStore } from "@/lib/zustand";
import { FaEllipsisVertical } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Logout from "@/components/auth/logout";

const Dropdown = () => {
  const { setSidebarType } = useStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size={"icon"} variant={"ghost"} className="rounded-full">
          <FaEllipsisVertical />
        </Button>
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
