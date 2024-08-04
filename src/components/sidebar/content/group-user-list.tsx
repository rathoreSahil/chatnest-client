"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/zustand";

import UserList from "@/components/sidebar/content/user-list";
import SelectedUsers from "@/components/sidebar/content/selected-users";
import ArrowRightButton from "@/components/sidebar/footer/arrow-right-button";

const GroupUserList = () => {
  const { users, setUsers, setSidebarType, selectedUsers, setSelectedUsers } =
    useStore();

  // empty selected users on unmount
  useEffect(() => {
    return setSelectedUsers([]);
  }, [setSelectedUsers]);

  const handleClick = (user: User) => {
    setUsers(users.filter((u) => u._id !== user._id));
    setSelectedUsers([...selectedUsers, user]);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 space-y-6 ">
        <SelectedUsers />
        <UserList handleClick={handleClick} />
      </div>
      {selectedUsers.length > 0 && (
        // <Button
        //   variant={"outline"}
        //   className="mx-auto my-8 rounded-full overflow-hidden h-16 w-16"
        //   onClick={() => setSidebarType("group-details")}
        // >
        //   <ArrowRight />
        // </Button>
        <ArrowRightButton
          onClickHandler={() => setSidebarType("group-details")}
        />
      )}
    </div>
  );
};

export default GroupUserList;
