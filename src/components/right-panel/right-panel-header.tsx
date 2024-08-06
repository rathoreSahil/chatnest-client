import { X } from "lucide-react";
import { useStore } from "@/lib/zustand";

const RightPanelHeader = () => {
  const setIsRightPanelOpen = useStore((state) => state.setIsRightPanelOpen);
  return (
    <div className="flex items-center justify-start gap-4 text-xl px-5 py-3">
      <X
        className="cursor-pointer"
        onClick={() => setIsRightPanelOpen(false)}
      />
      <span>Chat Info</span>
    </div>
  );
};

export default RightPanelHeader;
