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

import { ChangeEvent, useRef } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import ProfilePhoto from "@/components/profile/profile-photo";

type PhotoActionsProps = {
  photoSrc?: string;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleRemovePhoto: () => Promise<void>;
  loading: boolean;
  isDisabled?: boolean;
};

const PhotoActions = ({
  photoSrc = "/default.webp",
  handleFileChange,
  handleRemovePhoto,
  loading,
  isDisabled,
}: PhotoActionsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
          <DropdownMenuTrigger
            className="w-full focus:outline-none"
            disabled={isDisabled}
          >
            <ProfilePhoto
              src={photoSrc}
              className="h-60 w-60 mx-auto"
              loading={loading}
              hoverOverlay
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute top-0 left-0">
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
        <DialogContent className="flex items-center justify-center p-0 border-0 w-min h-min focus:outline-none">
          <ProfilePhoto src={photoSrc} className="rounded-md h-max w-max" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoActions;
