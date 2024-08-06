import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import ProfilePhoto from "@/components/profile/profile-photo";

const PhotoModal = ({ photoSrc = "/default.webp" }: { photoSrc?: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <ProfilePhoto src={photoSrc} className="h-60 w-60 mx-auto" />
      </DialogTrigger>
      <VisuallyHidden>
        <DialogTitle>Profile Photo</DialogTitle>
      </VisuallyHidden>
      <DialogContent className="flex items-center justify-center p-0 border-0 w-min h-min focus:outline-none">
        <ProfilePhoto src={photoSrc} className="rounded-md h-max w-max" />
      </DialogContent>
    </Dialog>
  );
};

export default PhotoModal;
