import { checkIfChatExists } from "@/lib/utils";
import { useChatStore } from "@/states/chatStates";
import { useSidebarStore } from "@/states/sidebarStates";
import { useChatListStore } from "@/states/chatListState";
import UserList from "@/components/sidebar/content/user-list";

const NewChat = () => {
  const { chats } = useChatListStore();
  const { setSidebarType } = useSidebarStore();
  const { setCurrentChat, setTempChat } = useChatStore();

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
