"use client";

import Chat from "@/components/chat-window/chat";
import Sidebar from "@/components/sidebar/sidebar";
import Menubar from "@/components/menubar/menubar";

const LoggedInComponent = () => {
  return (
    <>
      <div className="flex h-lvh">
        <Sidebar />
        <Chat />
      </div>
    </>
  );
};

export default LoggedInComponent;
