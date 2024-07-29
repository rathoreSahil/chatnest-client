"use client";

import { Button } from "../ui/button";
import { useStore } from "@/lib/zustand";
import { ArrowRight } from "lucide-react";
import UserList from "./user-list";
import SelectedUsers from "./selected-users";

const GroupUserList = () => {
  const users = useStore((state) => state.users);
  const setUsers = useStore((state) => state.setUsers);
  const setSidebarType = useStore((state) => state.setSidebarType);

  const selectedUsers = useStore((state) => state.selectedUsers);
  const setSelectedUsers = useStore((state) => state.setSelectedUsers);

  const handleClick = (user: User) => {
    setUsers(users.filter((u) => u._id !== user._id));
    setSelectedUsers([...selectedUsers, user]);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-6">
        <SelectedUsers />
        <UserList handleClick={handleClick} />
      </div>
      {selectedUsers.length > 0 && (
        <Button
          variant="secondary"
          className="mx-auto my-8 rounded-full overflow-hidden h-16 w-16 p-0"
          onClick={() => setSidebarType("group-details")}
        >
          <ArrowRight />
        </Button>
      )}
    </div>
  );
};

export default GroupUserList;
