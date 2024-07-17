import { useAuth } from "@/context/auth-provider";
import { useStore } from "@/lib/zustand";
import UserList from "./user-list";

const NewChat = () => {
  const chats = useStore((state) => state.chats);
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const setChatModalType = useStore((state) => state.setChatModalType);

  const { user: currentUser } = useAuth();

  // handle new chat click
  async function handleClick(otherUser: User) {
    try {
      const newChatName = `${currentUser?.name}-${otherUser.name}`;
      const newChatPhoto = `${currentUser?.photo} ${otherUser.photo}`;

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
  return <UserList handleClick={handleClick} />;
};

export default NewChat;
