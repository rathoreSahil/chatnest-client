"use client";

import { useStore } from "@/lib/zustand";
import { useAuth } from "@/context/auth-provider";
import { getChatName, getChatPhoto } from "@/lib/utils";
import ProfilePhoto from "@/components/profile/profile-photo";

const ChatHeader = () => {
  const authUser = useAuth().authUser!;
  const { currentChat, setIsRightPanelOpen } = useStore();

  const displayName = getChatName(currentChat!, authUser._id);
  const displayPhoto = getChatPhoto(currentChat!, authUser._id);

  return (
    <div
      onClick={() => setIsRightPanelOpen(true)}
      className="flex items-center gap-4 cursor-pointer text-xl px-5 py-3"
    >
      <ProfilePhoto src={displayPhoto} className="h-10 w-10" />
      {displayName}
    </div>
  );
};

export default ChatHeader;
