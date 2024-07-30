import { useStore } from "@/lib/zustand";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-provider";
import { useFetchUsers } from "@/hooks/useFetchUsers";

import ChatListSkeleton from "@/components/skeleton/chat-list-skeleton";

const UserList = ({ handleClick }: { handleClick: (user: User) => void }) => {
  const [loading, fetchUsers] = useFetchUsers();
  const { users, search, setUsers } = useStore();
  const [filteredUsers, setFilteredUsers] = useState<User[]>();

  const authUser = useAuth().authUser!;

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
  if (loading) return <ChatListSkeleton length={8} />;

  // render users
  return (
    <div>
      {filteredUsers ? (
        filteredUsers.map((user) => )
      ) : (
        <div className="text-center mt-10">Users will appear here...</div>
      )}
    </div>
  );
};

export default UserList;
