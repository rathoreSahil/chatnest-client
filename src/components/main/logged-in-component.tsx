"use client";

import { useStore } from "@/lib/zustand";
import { MessageContextProvider } from "@/context/message-provider";

import Chat from "@/components/chat-window/chat";
import Sidebar from "@/components/sidebar/sidebar";
import RightPanel from "@/components/right-panel/right-panel";

const LoggedInComponent = () => {
  const { isRightPanelOpen } = useStore();

  return (
    <MessageContextProvider>
      <Sidebar className="w-[27%]" />
      <Chat className="flex-1" />
      {isRightPanelOpen && <RightPanel className="w-[27%]" />}
    </MessageContextProvider>
  );
};

export default LoggedInComponent;
