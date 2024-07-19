import useFetchUsers from "@/hooks/useFetchUsers";
import { useStore } from "@/lib/zustand";
import { useEffect, useState } from "react";
import ProfilePhoto from "../profile/profile-photo";
import { useAuth } from "@/context/auth-provider";
import ChatListSkeleton from "../skeleton/chat-list-skeleton";

const UserList = ({ handleClick }: { handleClick: (user: User) => void }) => {
  const [filteredUsers, setFilteredUsers] = useState<User[]>([{} as User]);
  const [loading, fetchUsers] = useFetchUsers();

  const users = useStore((state) => state.users);
  const setUsers = useStore((state) => state.setUsers);
  const search = useStore((state) => state.search);
  const { user: currentUser } = useAuth();

  // fetch users
  useEffect(() => {
    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, [fetchUsers, setUsers]);

  // filter users based on search
  useEffect(() => {
    if (!users.length) return;
    const results = users.filter((chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(results);
  }, [users, search]);

  // loading state
  if (loading) {
    return <ChatListSkeleton length={8} />;
  }

  // render users
  return (
    <div>
      {filteredUsers.length ? (
        filteredUsers.map((user) => {
          if (!user._id) return;

          const isCurrentUser = currentUser?._id === user._id;
          return (
            !isCurrentUser && (
              <div
                onClick={() => handleClick(user)}
                key={user._id}
                className="p-4 cursor-pointer hover:bg-slate-900 flex gap-4 items-center"
              >
                <ProfilePhoto src={user.photo} />
                <div>
                  <p>{user.name}</p>
                  <p className="opacity-50 text-sm italic">
                    {user.description}
                  </p>
                </div>
              </div>
            )
          );
        })
      ) : (
        <div className="text-center mt-10">Users will appear here...</div>
      )}
    </div>
  );
};

export default UserList;
