import { useStore } from "@/lib/zustand";
import { checkIfChatExists } from "@/lib/utils";
import UserList from "@/components/sidebar/content/user-list";

const NewChat = () => {
  const { chats, setCurrentChat, setSidebarType, setTempChat } = useStore();

  // handle new chat click
  async function handleClick(otherUser: User) {
    // check if chat already exists
    const existingChat = checkIfChatExists(chats, otherUser._id);
    if (existingChat) {
      setCurrentChat(existingChat);
      setTempChat(null);
    } else {
      setTempChat(otherUser);
    }

    setSidebarType("chat");
  }
  return <UserList handleClick={handleClick} />;
};

export default NewChat;
