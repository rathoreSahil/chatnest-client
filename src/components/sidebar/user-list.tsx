import useFetchUsers from "@/hooks/useFetchUsers";
import { useStore } from "@/lib/zustand";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ProfilePhoto from "../profile/profile-photo";
import { useAuth } from "@/context/auth-provider";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, fetchUsers] = useFetchUsers();
  const chats = useStore((state) => state.chats);
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const setChatModalType = useStore((state) => state.setChatModalType);
  const search = useStore((state) => state.search);

  const { user: currentUser } = useAuth();

  // fetch users
  useEffect(() => {
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
  async function handleClick(otherUser: User) {
    try {
      const newChatName = `${currentUser?.name}-${otherUser.name}`;
      const newChatPhoto = `${currentUser?.photo} ${otherUser.photo}`;

      console.log("newChatName", newChatName);
      let chatExists = false;

      // check if chat already exists
      chats.forEach((chat) => {
        if (chat.name === newChatName && chat.photo === newChatPhoto) {
          chatExists = true;
          setCurrentChat(chat);
          setChatModalType("chat");
        }
      });

      if (chatExists) return;
      setCurrentChat(otherUser);
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
    <>
      {filteredUsers.length ? (
        filteredUsers.map((user) => {
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
        <div className="text-center mt-10">User list will appear here...</div>
      )}
    </>
  );
};

export default UserList;
