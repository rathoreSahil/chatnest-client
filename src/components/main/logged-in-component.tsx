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
      <div className="flex h-full w-full">
        <Sidebar className="basis-[28%]" />
        <Chat className="flex-1" />
        {isRightPanelOpen && <RightPanel className="basis-[28%]" />}
      </div>
    </MessageContextProvider>
  );
};

export default LoggedInComponent;
