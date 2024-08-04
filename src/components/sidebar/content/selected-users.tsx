import { X } from "lucide-react";
import { useStore } from "@/lib/zustand";
import ProfilePhoto from "@/components/profile/profile-photo";

const SelectedUsers = () => {
  const { users, setUsers, selectedUsers, setSelectedUsers } = useStore();

  function removeSelectedUser(user: User) {
    setUsers([...users, user]);
    setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id));
  }

  return (
    <div className="flex flex-wrap gap-2 px-3">
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
