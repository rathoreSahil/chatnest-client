"use client";

import { useAuth } from "@/context/auth-provider";
import { useStore } from "@/lib/zustand";
import ProfilePhoto from "../profile/profile-photo";

const ChatHeader = () => {
  const authUser = useAuth().authUser!;
  const currentChat = useStore((state) => state.currentChat)!;
  const setIsRightPanelOpen = useStore((state) => state.setIsRightPanelOpen);

  const isGroupChat = "participantCount" in currentChat;
  let displayName;
  let displayPhoto;
  if (isGroupChat) {
    displayName = currentChat.name;
    displayPhoto = currentChat.photo;
  } else {
    // console.log("currentChat:", { currentChat });
    // console.log("currentChat.user1", currentChat.user1);
    // console.log("currentChat.user1._id", currentChat.user1._id);
    const otherUser =
      authUser._id === currentChat.user1._id
        ? currentChat.user2
        : currentChat.user1;

    displayName = otherUser.name;
    displayPhoto = otherUser.photo;
  }

  return (
    <div
      onClick={() => setIsRightPanelOpen(true)}
      className="p-3 cursor-pointer text-xl bg-slate-800 border flex gap-4 items-center"
    >
      <ProfilePhoto className="h-10 w-10" src={displayPhoto} />
      {displayName}
    </div>
  );
};

export default ChatHeader;
