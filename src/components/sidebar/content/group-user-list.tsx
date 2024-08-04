"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/zustand";

import UserList from "@/components/sidebar/content/user-list";
import SelectedUsers from "@/components/sidebar/misc/selected-users";
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
        <ArrowRightButton
          onClickHandler={() => setSidebarType("group-details")}
        />
      )}
    </div>
  );
};

export default GroupUserList;
