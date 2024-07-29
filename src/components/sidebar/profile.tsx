"use client";

import { useAuth } from "@/context/auth-provider";
import ProfilePhoto from "@/components/profile/profile-photo";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Camera, Loader2 } from "lucide-react";
import { ChangeEvent, useRef } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/lib/zustand";
import useUploadPhoto from "@/hooks/useUploadPhoto";
import useDeletePhoto from "@/hooks/useDeletePhoto";
import { useDisclosure } from "@nextui-org/modal";
import PhotoModal from "../profile/photo-modal";

const Profile = () => {
  const { authUser, setAuthUser } = useAuth();
  const [uploadLoading, uploadPhoto] = useUploadPhoto();
  const [deleteLoading, deletePhoto] = useDeletePhoto();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const setSidebarType = useStore((state) => state.setSidebarType);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const user = await uploadPhoto(file);
      if (!user) return;
      setAuthUser(user);
      setSidebarType("chat");
    }
  };

  return (
    <div className="p-10 space-y-8">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleFileChange(e)}
      />

      <PhotoModal
        src={authUser?.photo}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />

      <DropdownMenu>
        <div className="group h-48 w-48 relative rouded-full overflow-hidden mx-auto">
          <DropdownMenuTrigger className=" focus:outline-none">
            <ProfilePhoto
              src={authUser?.photo}
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
              const user = await deletePhoto();
              if (!user) return;
              setAuthUser(user);
              setSidebarType("chat");
            }}
          >
            Remove Photo
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div>
        <Label className="pl-3 pb-3 text-green-400" htmlFor="name">
          Name
        </Label>
        <Input
          className="border-0 text-md focus-visible:border-b focus-visible:border-white"
          id="name"
          value={authUser?.name}
          readOnly
        />
      </div>
      <div>
        <Label className="pl-3 pb-3 text-green-400" htmlFor="description">
          Description
        </Label>
        <Input
          className="border-0 text-md text-wrap break-words focus-visible:border-b focus-visible:border-white"
          id="description"
          value={authUser?.description}
          readOnly
        />
      </div>
    </div>
  );
};

export default Profile;
