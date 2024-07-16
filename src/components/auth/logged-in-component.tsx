"use client";

import Chat from "@/components/chat-window/chat";
import Sidebar from "@/components/sidebar/sidebar";
import { MessageContextProvider } from "@/context/message-provider";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import RightPanel from "@/components/right-panel/right-panel";
import { useStore } from "@/lib/zustand";

const LoggedInComponent = () => {
  const isRightPanelOpen = useStore((state) => state.isRightPanelOpen);

  return (
    <MessageContextProvider>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={70}>
          <Chat />
        </ResizablePanel>
        {isRightPanelOpen && (
          <>
            <ResizableHandle />
            <ResizablePanel defaultSize={40}>
              <RightPanel />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </MessageContextProvider>
  );
};

export default LoggedInComponent;
