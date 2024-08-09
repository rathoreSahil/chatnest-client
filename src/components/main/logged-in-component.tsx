"use client";
import { AnimatePresence } from "framer-motion";
import { useRightPanelStore } from "@/states/rightPanelStore";
import { MessageContextProvider } from "@/context/message-provider";

import Chat from "@/components/chat-window/chat";
import Sidebar from "@/components/sidebar/sidebar";
import RightPanel from "@/components/right-panel/right-panel";

const LoggedInComponent = () => {
  const { isRightPanelOpen } = useRightPanelStore();

  return (
    <MessageContextProvider>
      <Sidebar className="w-[27%] border-r" />
      <Chat className="flex-1" />
      <AnimatePresence>
        {isRightPanelOpen && <RightPanel className="w-[27%] border-l" />}
      </AnimatePresence>
    </MessageContextProvider>
  );
};

export default LoggedInComponent;
