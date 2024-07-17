import { useState } from "react";
import ProfilePhoto from "../profile/profile-photo";
import { X } from "lucide-react";
import { useStore } from "@/lib/zustand";

type SelectedUsersProps = {
  selectedUsers: User[];
  setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const SelectedUsers = ({
  selectedUsers,
  setSelectedUsers,
}: SelectedUsersProps) => {
  const users = useStore((state) => state.users);
  const setUsers = useStore((state) => state.setUsers);

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
