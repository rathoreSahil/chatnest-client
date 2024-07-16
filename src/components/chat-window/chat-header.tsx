"use client";

import { useAuth } from "@/context/auth-provider";
import { useStore } from "@/lib/zustand";
import ProfilePhoto from "../profile/profile-photo";

const ChatHeader = () => {
  const setIsRightPanelOpen = useStore((state) => state.setIsRightPanelOpen);
  const currentChat = useStore((state) => state.currentChat);
  const { user } = useAuth();
  const displayName = currentChat?.name
    .split("-")
    .filter((name) => name !== user?.name)[0];

  const chatPhoto = currentChat?.photo
    .split(" ")
    .filter((photo) => photo !== user?.photo)[0];

  return (
    <div
      onClick={() => setIsRightPanelOpen(true)}
      className="p-4 cursor-pointer text-xl bg-slate-800 border flex gap-4 items-center"
    >
      <ProfilePhoto className="h-10 w-10" src={chatPhoto} />
      {displayName}
    </div>
  );
};

export default ChatHeader;
