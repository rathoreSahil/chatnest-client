import { useStore } from "@/lib/zustand";
import { checkIfChatExists } from "@/lib/utils";
import { useAuth } from "@/context/auth-provider";
import UserList from "@/components/sidebar/user-list";

const NewChat = () => {
  const authUser = useAuth().authUser!;
  const { chats, setCurrentChat, setSidebarType } = useStore();

  // handle new chat click
  async function handleClick(otherUser: User) {
    try {
      // check if chat already exists
      const existingChat = checkIfChatExists(chats, otherUser._id);
      if (existingChat) setCurrentChat(existingChat);

      setSidebarType("chat");
    } catch (error: any) {
      console.error("error creating chat", error.message);
      throw new Error("Error creating chat", error.message);
    }
  }
  return <UserList handleClick={handleClick} />;
};

export default NewChat;
