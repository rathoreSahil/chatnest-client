import { useState } from "react";
import ProfilePhoto from "@/components/profile/profile-photo";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";

const PhotoModal = ({ photoSrc = "/default.webp" }: { photoSrc?: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProfilePhoto
        onClick={() => setOpen(true)}
        src={photoSrc}
        className="h-60 w-60 mx-auto"
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex items-center justify-center p-0 border-0 w-min h-min focus:outline-none">
          <VisuallyHidden>
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
          </VisuallyHidden>
          <ProfilePhoto src={photoSrc} className="rounded-md h-max w-max" />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoModal;
