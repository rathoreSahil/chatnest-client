import { useAuth } from "@/context/auth-provider";
import useFetchUsers from "@/hooks/useFetchUsers";
import { Fetch } from "@/lib/fetch";
import { User } from "@/lib/types";
import { useStore } from "@/lib/zustand";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, fetchUsers] = useFetchUsers();
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const setIsNewChatModalOpen = useStore(
    (state) => state.setIsNewChatModalOpen
  );
  const search = useStore((state) => state.search);

  const { user: currentUser } = useAuth();

  useEffect(() => {
    console.log("fetching users");
    fetchUsers().then((data) => {
      setUsers(data);
    });
  }, [fetchUsers]);

  useEffect(() => {
    if (!users.length) return;
    const results = users.filter((chat) =>
      chat.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredUsers(results);
  }, [users, search]);

  async function handleClick(user: User) {
    try {
      // create new chat
      const newChatDetails = { name: `${currentUser?.name}-${user.name}` };
      const res = await Fetch.POST("/chats", newChatDetails);

      const newChat = res.data;
      const newChatId = res.data._id;

      // create 2 participants for the chat - currentUser and user
      const newParticipantsData = {
        participants: [
          { chat: newChatId, user: currentUser?._id },
          { chat: newChatId, user: user._id },
        ],
      };

      await Fetch.POST("/participants", newParticipantsData);

      // set current chat
      setCurrentChat(newChat);
      setIsNewChatModalOpen(false);
    } catch (error: any) {
      console.error("error creating chat", error.message);
    }
  }

  if (loading) {
    return <Loader2 className="animate-spin w-full" />;
  }

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
