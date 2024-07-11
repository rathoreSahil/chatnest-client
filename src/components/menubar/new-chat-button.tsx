import { FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import useFetchUsers from "@/hooks/useFetchUsers";
import { useStore } from "@/lib/zustand";
import { set } from "react-hook-form";

const NewChatButton = () => {
  const setIsNewChatModalOpen = useStore(
    (state) => state.setIsNewChatModalOpen
  );

  async function handleNewChatAction() {
    setIsNewChatModalOpen(true);
  }

  return (
    <Button
      onClick={handleNewChatAction}
      className=" bg-slate-800 w-min hover:bg-slate-800"
    >
      <FaPlus className="text-white" />
    </Button>
  );
};

export default NewChatButton;
