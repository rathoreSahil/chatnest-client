import useFetchUsers from "@/hooks/useFetchUsers";
import { User } from "@/lib/types";
import { useStore } from "@/lib/zustand";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, fetchUsers] = useFetchUsers();
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const setChatModalType = useStore((state) => state.setChatModalType);
  const search = useStore((state) => state.search);

  // fetch users
  useEffect(() => {
    console.log("fetching users");
    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, [fetchUsers]);

  // filter users based on search
  useEffect(() => {
    if (!users.length) return;
    const results = users.filter((chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(results);
  }, [users, search]);

  // handle new chat click
  async function handleClick(user: User) {
    try {
      setCurrentChat(user);
      setChatModalType("chat");
    } catch (error: any) {
      console.error("error creating chat", error.message);
    }
  }

  // loading state
  if (loading) {
    return (
      <div className="flex-1">
        <Loader2 className="animate-spin w-full" />
      </div>
    );
  }

  // render users
  return (
    <div className="flex-1">
      {filteredUsers.length ? (
        filteredUsers.map((user) => {
          return (
            <div
              onClick={() => handleClick(user)}
              key={user._id}
              className="p-4 cursor-pointer hover:bg-slate-900"
            >
              {user.name}
            </div>
          );
        })
      ) : (
        <div className="text-center mt-10">User list will appear here...</div>
      )}
    </div>
  );
};

export default UserList;
