import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/zustand";
import { IoArrowBackSharp } from "react-icons/io5";
const MenuHeader = ({ title }: { title: string }) => {
  const setChatModalType = useStore((state) => state.setChatModalType);
  return (
    <div className="flex items-center justify-start gap-2 p-3 bg-slate-800 border">
      <Button variant="base" onClick={() => setChatModalType("chat")}>
        <IoArrowBackSharp className="text-xl " />
      </Button>
      <span className="text-xl">{title}</span>
    </div>
  );
};

export default MenuHeader;
