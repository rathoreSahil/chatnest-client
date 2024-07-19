import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/zustand";
import { X } from "lucide-react";
import ProfilePhoto from "@/components/profile/profile-photo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-provider";

const RightPanel = () => {
  const currentChat = useStore((state) => state.currentChat);
  const setIsRightPanelOpen = useStore((state) => state.setIsRightPanelOpen);

  const { user } = useAuth();

  const displayName = currentChat?.name
    .split("-")
    .filter((name) => name !== user?.name)[0];

  const chatPhoto = currentChat?.photo
    .split(" ")
    .filter((photo) => photo !== user?.photo)[0];

  return (
    <>
      <div className="p-3 h-[66px] flex items-center justify-start bg-slate-800">
        <Button variant="base" onClick={() => setIsRightPanelOpen(false)}>
          <X className="text-xl" />
        </Button>
        <span className="text-xl">Chat Info</span>
      </div>
      <div className="text-center">
        <ProfilePhoto
          src={chatPhoto}
          className="h-48 w-48 mx-auto mt-12 mb-6 "
        />
        <p className="text-2xl ">{displayName}</p>
      </div>
    </>
  );
};

export default RightPanel;
