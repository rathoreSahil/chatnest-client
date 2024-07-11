import LogoutButton from "@/components/auth/logout-button";
import NewChatButton from "@/components/menubar/new-chat-button";
import { useStore } from "@/lib/zustand";
import { Button } from "@/components/ui/button";
import { IoArrowBackSharp } from "react-icons/io5";

const Menubar = () => {
  const isNewChatModalOpen = useStore((state) => state.isNewChatModalOpen);
  const setIsNewChatModalOpen = useStore(
    (state) => state.setIsNewChatModalOpen
  );
  return (
    <div className="p-4 space-x-2">
      {isNewChatModalOpen ? (
        <>
          <Button variant="ghost" onClick={() => setIsNewChatModalOpen(false)}>
            <IoArrowBackSharp className="text-xl" />
          </Button>
          <span>New Chat</span>
        </>
      ) : (
        <>
          <NewChatButton />
          <LogoutButton />
        </>
      )}
    </div>
  );
};

export default Menubar;
