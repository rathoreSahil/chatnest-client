import Chat from "@/components/chat";
import Sidebar from "@/components/sidebar";

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
