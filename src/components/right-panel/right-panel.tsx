import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/zustand";
import { Camera, Loader2, X } from "lucide-react";
import ProfilePhoto from "@/components/profile/profile-photo";
import { useAuth } from "@/context/auth-provider";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { cn, getLoggedInParticipantDetails } from "@/lib/utils";
import useUploadGroupPhoto from "@/hooks/useUploadGroupPhoto";
import useDeleteGroupPhoto from "@/hooks/useDeleteGroupPhoto";
import { RightPanelProps } from "@/types";

const RightPanel = ({ className }: RightPanelProps) => {
  const currentChat = useStore((state) => state.currentChat)!;
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const setSidebarType = useStore((state) => state.setSidebarType);
  const setIsRightPanelOpen = useStore((state) => state.setIsRightPanelOpen);

  const [uploadLoading, uploadGroupPhoto] = useUploadGroupPhoto();
  const [deleteLoading, deleteGroupPhoto] = useDeleteGroupPhoto();

  const authUser = useAuth().authUser!;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [isAdmin, setIsAdmin] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isGroupChat = "participantCount" in currentChat;

  useEffect(() => {
    if (!isGroupChat) return;
    getLoggedInParticipantDetails(currentChat._id).then((participant) => {
      setIsAdmin(participant.isAdmin);
    });
  }, [currentChat._id, isGroupChat]);

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

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const groupChat = await uploadGroupPhoto(currentChat as GroupChat, file);
      if (!groupChat) return;
      setCurrentChat(groupChat);
      setSidebarType("chat");
    }
  };

  return (
    <div className={cn("", className)}>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleFileChange(e)}
      />
      <PhotoModal
        src={displayPhoto}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <div className="p-3 h-[66px] flex items-center justify-start">
        <Button onClick={() => setIsRightPanelOpen(false)}>
          <X className="text-xl" />
        </Button>
        <span className="text-xl">Chat Info</span>
      </div>
      <div className="text-center pt-12">
        {!isGroupChat || !isAdmin ? (
          <ProfilePhoto
            onClick={onOpen}
            src={displayPhoto}
            className="h-48 w-48 mx-auto"
          />
        ) : (
          <DropdownMenu>
            <div className="group h-48 w-48 relative rouded-full overflow-hidden mx-auto">
              <DropdownMenuTrigger className="focus:outline-none">
                <ProfilePhoto
                  src={displayPhoto}
                  className="h-48 w-48 group-hover:opacity-40"
                />
              </DropdownMenuTrigger>
              {uploadLoading || deleteLoading ? (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <Loader2 className="animate-spin" />
                </div>
              ) : (
                <Camera className="h-5 w-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden group-hover:block" />
              )}
            </div>

            <DropdownMenuContent className="border-0 absolute top-0 left-0">
              <DropdownMenuItem onClick={onOpen}>View Photo</DropdownMenuItem>
              <DropdownMenuItem onClick={openFileInput}>
                Upload Photo
              </DropdownMenuItem>
              <DropdownMenuItem>Take Photo</DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  const groupChat = await deleteGroupPhoto(currentChat);
                  if (!groupChat) return;
                  setCurrentChat(groupChat);
                  setSidebarType("chat");
                }}
              >
                Remove Photo
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <p className="pt-6 text-2xl ">{displayName}</p>
      </div>
    </div>
  );
};

export default RightPanel;
