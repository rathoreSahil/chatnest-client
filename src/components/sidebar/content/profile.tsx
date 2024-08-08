"use client";

import { ChangeEvent } from "react";
import { useAuth } from "@/context/auth-provider";
import { useUploadPhoto } from "@/hooks/useUploadPhoto";
import { useDeletePhoto } from "@/hooks/useDeletePhoto";
import { useSidebarStore } from "@/states/sidebarStates";

import toast from "react-hot-toast";
import InputBox from "@/components/sidebar/misc/input-box";
import PhotoActions from "@/components/sidebar/misc/photo-actions";

const Profile = () => {
  const { authUser, setAuthUser } = useAuth();
  const { setSidebarType } = useSidebarStore();

  const { loading: uploadLoading, uploadPhoto } = useUploadPhoto();
  const { loading: deleteLoading, deletePhoto } = useDeletePhoto();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const user = await uploadPhoto(file);
      toast.success("Photo uploaded successfully");
      setAuthUser(user);
      setSidebarType("chat");
    } catch (error: any) {
      toast.error("Error uploading photo", error.message);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      const user = await deletePhoto();
      toast.success("Photo removed successfully");
      setAuthUser(user);
      setSidebarType("chat");
    } catch (error: any) {
      toast.error("Error deleting photo", error.message);
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-6 p-10">
      <PhotoActions
        photoSrc={authUser?.photo}
        handleFileChange={handleFileChange}
        handleRemovePhoto={handleRemovePhoto}
        loading={uploadLoading || deleteLoading}
      />

      <InputBox id="name" label="Name" value={authUser?.name} readOnly />
      <InputBox
        id="description"
        label="Description"
        value={authUser?.description}
        readOnly
      />
    </div>
  );
};

export default Profile;
