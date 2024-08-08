import { useAuth } from "@/context/auth-provider";
import { useChatStore } from "@/states/chatStates";
import { getChatName, getChatPhoto } from "@/lib/utils";
import ProfilePhoto from "@/components/profile/profile-photo";

type ChatListItemProps = {
  chat: DirectChat | GroupChat;
};

const ChatListItem = ({ chat }: ChatListItemProps) => {
  const { setCurrentChat } = useChatStore();

  const authUser = useAuth().authUser!;
  const displayName = getChatName(chat, authUser._id);
  const displayPhoto = getChatPhoto(chat, authUser._id);
  return (
    <div
      onClick={() => setCurrentChat(chat)}
      className="px-4 py-3 cursor-pointer flex gap-4 items-center hover:bg-gray-100"
    >
      <ProfilePhoto src={displayPhoto} />
      <div className=" w-9/12">
        <p>{displayName}</p>
        <p className="text-sm opacity-60 truncate">{chat.lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatListItem;
