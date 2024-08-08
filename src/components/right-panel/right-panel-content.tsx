import { useAuth } from "@/context/auth-provider";
import { ChangeEvent, useEffect, useState } from "react";

import {
  getAdminStatus,
  isGroupChat,
  getChatName,
  getChatPhoto,
} from "@/lib/utils";

import { useChatStore } from "@/states/chatStates";
import { useSidebarStore } from "@/states/sidebarStates";
import { useUploadGroupPhoto } from "@/hooks/useUploadGroupPhoto";
import { useDeleteGroupPhoto } from "@/hooks/useDeleteGroupPhoto";

import toast from "react-hot-toast";
import PhotoModal from "@/components/right-panel/photo-modal";
import PhotoActions from "@/components/sidebar/misc/photo-actions";

const RightPanelContent = () => {
  const authUser = useAuth().authUser!;
  const [isAdmin, setIsAdmin] = useState(false);

  const { setSidebarType } = useSidebarStore();
  const { currentChat, setCurrentChat } = useChatStore();

  const { loading: uploadLoading, uploadGroupPhoto } = useUploadGroupPhoto();
  const { loading: deleteLoading, deleteGroupPhoto } = useDeleteGroupPhoto();

  const isGroup = isGroupChat(currentChat!);
  const displayName = getChatName(currentChat!, authUser._id);
  const displayPhoto = getChatPhoto(currentChat!, authUser._id);

  useEffect(() => {
    if (!isGroup) return;
    getAdminStatus(currentChat._id).then((status) => {
      setIsAdmin(status);
    });
  }, [currentChat, isGroup]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const groupChat = await uploadGroupPhoto(currentChat as GroupChat, file);
      toast.success("Photo uploaded successfully");
      setCurrentChat(groupChat);
      setSidebarType("chat");
    } catch (error: any) {
      toast.error("Failed to upload photo", error.message);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      const groupChat = await deleteGroupPhoto(currentChat as GroupChat);
      toast.success("Photo removed successfully");
      setCurrentChat(groupChat);
      setSidebarType("chat");
    } catch (error: any) {
      toast.error("Failed to delete photo", error.message);
    }
  };

  const isPhotoActionDisabled = !isGroup || !isAdmin;
  return (
    <div className="flex-1 p-10">
      {isPhotoActionDisabled ? (
        <PhotoModal photoSrc={displayPhoto} />
      ) : (
        <PhotoActions
          photoSrc={displayPhoto}
          handleFileChange={handleFileChange}
          handleRemovePhoto={handleRemovePhoto}
          loading={uploadLoading || deleteLoading}
          isDisabled={isPhotoActionDisabled}
        />
      )}
      <p className="text-2xl text-center mt-4">{displayName}</p>
    </div>
  );
};

export default RightPanelContent;
