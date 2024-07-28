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
  const arr = isRightPanelOpen ? [30, 40, 30] : [30, 70];

  return (
    <MessageContextProvider>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          maxSize={40}
          minSize={25}
          order={1}
          id="left"
          defaultSize={arr[0]}
        >
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel order={2} id="middle" defaultSize={arr[1]}>
          <Chat />
        </ResizablePanel>
        {isRightPanelOpen && (
          <>
            <ResizableHandle />
            <ResizablePanel
              maxSize={40}
              minSize={25}
              order={3}
              id="right"
              defaultSize={arr[2]}
            >
              <RightPanel />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </MessageContextProvider>
  );
};

export default LoggedInComponent;
