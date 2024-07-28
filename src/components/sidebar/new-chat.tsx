import { useAuth } from "@/context/auth-provider";
import { useStore } from "@/lib/zustand";
import UserList from "./user-list";

const NewChat = () => {
  const chats = useStore((state) => state.chats);
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const setChatModalType = useStore((state) => state.setChatModalType);

  const authUser = useAuth().authUser!;

  // handle new chat click
  async function handleClick(otherUser: User) {
    try {
      // check if chat already exists
      let chatExists = false;
      chats.forEach((chat) => {
        const isGroupChat = "participantCount" in chat;
        if (
          !isGroupChat &&
          (chat.user1._id === otherUser._id || chat.user2._id === otherUser._id)
        ) {
          chatExists = true;
          setCurrentChat(chat);
          setChatModalType("chat");
        }
      });

      if (chatExists) return;

      setCurrentChat({ user1: authUser, user2: otherUser } as DirectChat);
      setChatModalType("chat");
    } catch (error: any) {
      console.error("error creating chat", error.message);
      throw new Error("Error creating chat", error.message);
    }
  }
  return <UserList handleClick={handleClick} />;
};

export default NewChat;
