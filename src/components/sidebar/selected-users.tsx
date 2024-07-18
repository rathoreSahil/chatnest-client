import { useState } from "react";
import ProfilePhoto from "../profile/profile-photo";
import { X } from "lucide-react";
import { useStore } from "@/lib/zustand";

const SelectedUsers = () => {
  const users = useStore((state) => state.users);
  const setUsers = useStore((state) => state.setUsers);

  const selectedUsers = useStore((state) => state.selectedUsers);
  const setSelectedUsers = useStore((state) => state.setSelectedUsers);

  function removeSelectedUser(user: User) {
    setUsers([...users, user]);
    setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
  }

  return (
    <div className="flex gap-2 px-3">
      {selectedUsers.map((user) => {
        return (
          <div
            key={user._id}
            className="flex gap-2 items-center justify-center p-2 border border-gray-500 rounded-full"
          >
            <ProfilePhoto src={user.photo} className="h-4 w-4" />
            <p className="text-sm">{user.name}</p>
            <X
              className="h-4 w-4 cursor-pointer"
              onClick={() => removeSelectedUser(user)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SelectedUsers;
