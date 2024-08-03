import { useStore } from "@/lib/zustand";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-provider";
import { useFetchUsers } from "@/hooks/useFetchUsers";

import UserListItem from "@/components/sidebar/user-list-item";
import SidebarListSkeleton from "@/components/skeleton/sidebar-list-skeleton";

type UserListProps = {
  handleClick: (user: User) => void;
};

const UserList = ({ handleClick }: UserListProps) => {
  const authUser = useAuth().authUser!;
  const [loading, fetchUsers] = useFetchUsers();
  const { users, search, setUsers } = useStore();
  const [filteredUsers, setFilteredUsers] = useState<User[]>();

  // fetch users
  useEffect(() => {
    fetchUsers().then((users) => {
      setUsers(users);
    });
  }, [fetchUsers, setUsers]);

  // filter users based on search
  useEffect(() => {
    if (!users.length) return;
    const results = users.filter(
      (user) =>
        authUser._id !== user._id &&
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(results);
  }, [users, search, authUser._id]);

  // loading state
  if (loading) return <SidebarListSkeleton length={8} />;

  // render users
  return (
    <div>
      {filteredUsers ? (
        filteredUsers.map((user) => (
          <UserListItem key={user._id} user={user} handleClick={handleClick} />
        ))
      ) : (
        <div className="text-center mt-10">Users will appear here...</div>
      )}
    </div>
  );
};

export default UserList;
