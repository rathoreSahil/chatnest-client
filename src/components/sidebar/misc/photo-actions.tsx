import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useStore } from "@/lib/zustand";
import { ChangeEvent, useRef } from "react";
import { useAuth } from "@/context/auth-provider";
import { useUploadPhoto } from "@/hooks/useUploadPhoto";
import { useDeletePhoto } from "@/hooks/useDeletePhoto";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import toast from "react-hot-toast";
import ProfilePhoto from "@/components/profile/profile-photo";

type PhotoActionsProps = {
  photoSrc?: string;
};

const PhotoActions = ({ photoSrc = "/default.webp" }: PhotoActionsProps) => {
  const { setAuthUser } = useAuth();
  const { setSidebarType } = useStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { loading: uploadLoading, uploadPhoto } = useUploadPhoto();
  const { loading: deleteLoading, deletePhoto } = useDeletePhoto();

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const user = await uploadPhoto(file);
      setAuthUser(user);
      setSidebarType("chat");
    } catch (error: any) {
      toast.error("Error uploading photo", error.message);
    }
  };

  const handleRemovePhoto = async () => {
    try {
      const user = await deletePhoto();
      setAuthUser(user);
      setSidebarType("chat");
    } catch (error: any) {
      toast.error("Error deleting photo", error.message);
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleFileChange(e)}
      />

      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger className="mx-auto my-8 focus:outline-none">
            <ProfilePhoto
              src={photoSrc}
              className="h-60 w-60"
              loading={uploadLoading || deleteLoading}
              hoverOverlay
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="border-0 absolute top-0 left-0">
            <DialogTrigger asChild>
              <DropdownMenuItem>View Photo</DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem onClick={openFileInput}>
              Upload Photo
            </DropdownMenuItem>
            <DropdownMenuItem>Take Photo</DropdownMenuItem>
            <DropdownMenuItem onClick={handleRemovePhoto}>
              Remove Photo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <VisuallyHidden asChild>
          <DialogTitle>View Photo</DialogTitle>
        </VisuallyHidden>
        <DialogContent className="p-0 border-0 w-min h-min focus:outline-none">
          <ProfilePhoto src={photoSrc} className="rounded-md h-max w-max" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoActions;
