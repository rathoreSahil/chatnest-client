import { FaPlus } from "react-icons/fa";
import { Button } from "../ui/button";
import useFetchUsers from "@/hooks/useFetchUsers";
import { useStore } from "@/lib/zustand";

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
      className=" bg-slate-800 w-min hover:bg-slate-800 border border-white border-opacity-25"
    >
      <FaPlus className="text-white" />
    </Button>
  );
};

export default NewChatButton;
