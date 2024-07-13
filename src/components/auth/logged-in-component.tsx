"use client";

import Chat from "@/components/chat-window/chat";
import Sidebar from "@/components/sidebar/sidebar";
import { MessageContextProvider } from "@/context/message-provider";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const LoggedInComponent = () => {
  return (
    <MessageContextProvider>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={30}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <Chat />
        </ResizablePanel>
      </ResizablePanelGroup>
    </MessageContextProvider>
  );
};

export default LoggedInComponent;
