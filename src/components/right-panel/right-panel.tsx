import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/zustand";
import { X } from "lucide-react";
import ProfilePhoto from "@/components/profile/profile-photo";
import { useAuth } from "@/context/auth-provider";
import { useDisclosure } from "@nextui-org/modal";
import PhotoModal from "../profile/photo-modal";

const RightPanel = () => {
  const currentChat = useStore((state) => state.currentChat)!;
  const setIsRightPanelOpen = useStore((state) => state.setIsRightPanelOpen);

  const authUser = useAuth().authUser!;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isGroupChat = "participantCount" in currentChat;
  let displayName;
  let displayPhoto;
  if (isGroupChat) {
    displayName = currentChat.name;
    displayPhoto = currentChat.photo;
  } else {
    const otherUser =
      authUser._id === currentChat.user1._id
        ? currentChat.user2
        : currentChat.user1;

    displayName = otherUser.name;
    displayPhoto = otherUser.photo;
  }

  return (
    <>
      <PhotoModal
        src={displayPhoto}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <div className="p-3 h-[66px] flex items-center justify-start bg-slate-800">
        <Button variant="base" onClick={() => setIsRightPanelOpen(false)}>
          <X className="text-xl" />
        </Button>
        <span className="text-xl">Chat Info</span>
      </div>
      <div className="text-center">
        <ProfilePhoto
          onClick={onOpen}
          src={displayPhoto}
          className="h-48 w-48 mx-auto mt-12 mb-6 "
        />
        <p className="text-2xl ">{displayName}</p>
      </div>
    </>
  );
};

export default RightPanel;
