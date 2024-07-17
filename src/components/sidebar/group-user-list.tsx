"use client";

import { useStore } from "@/lib/zustand";
import SelectedUsers from "./selected-users";
import UserList from "./user-list";
import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const GroupUserList = () => {
  const users = useStore((state) => state.users);
  const setUsers = useStore((state) => state.setUsers);
  const setChatModalType = useStore((state) => state.setChatModalType);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleClick = (user: User) => {
    setUsers(users.filter((u) => u._id !== user._id));
    setSelectedUsers([...selectedUsers, user]);
  };

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="space-y-6">
        <SelectedUsers
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
        />
        <UserList handleClick={handleClick} />
      </div>
      {selectedUsers.length > 0 && (
        <Button
          variant="secondary"
          className="mx-auto my-8 rounded-full overflow-hidden h-16 w-16 p-0"
          onClick={() => setChatModalType("group-details")}
        >
          <ArrowRight />
        </Button>
      )}
    </div>
  );
};

export default GroupUserList;
