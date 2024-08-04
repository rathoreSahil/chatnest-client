import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-provider";
import { useStore } from "@/lib/zustand";
import { useState } from "react";
import { useSocket } from "@/context/socket-provider";
import SyncLoader from "react-spinners/SyncLoader";

import toast from "react-hot-toast";
import ProfilePhoto from "@/components/profile/profile-photo";
import useCreateGroupChat from "@/hooks/useCreateGroupChat";

const NewGroupDetails = () => {
  const [groupName, setGroupName] = useState("");
  const { loading, createGroupChat } = useCreateGroupChat();
  const [groupDescription, setGroupDescription] = useState("");
  const { selectedUsers, setCurrentChat, setSidebarType } = useStore();

  const socket = useSocket();
  const authUser = useAuth().authUser!;

  // handle create new group
  async function createNewGroup() {
    const newChatDetails = {
      name: groupName,
      description: groupDescription,
      photo: "/default-group.png",
      photoPublicId: "default-group",
      participantCount: selectedUsers.length + 1,
    };

    try {
      // create new chat
      const newChat = await createGroupChat(
        newChatDetails,
        selectedUsers,
        authUser
      );

      // trigger refresh event to update chat list of all participants
      if (!socket) return;
      socket.emit("new-chat-self", newChat);
      selectedUsers.forEach((user) => {
        socket.emit("new-chat", user._id, newChat);
      });

      // set current chat and sidebar type
      setCurrentChat(newChat);
      setSidebarType("chat");
    } catch (error: any) {
      toast.error("Error creating group chat", error.message);
      console.error("Error creating group chat", error.message);
    }
  }

  if (loading) {
    return (
      <div className="text-center">
        <SyncLoader size={10} className="my-10 mx-auto opacity-60" />
        Creating New Group Chat...
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-1 flex-col justify-between">
      <div>
        <ProfilePhoto
          src="/default-group.png"
          className="h-52 w-52 opacity-90 mx-auto mb-16"
        />
        <div className="pb-6">
          <Label className="pl-3 pb-3" htmlFor="name">
            Group Title
          </Label>
          <Input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className=""
            id="name"
          />
        </div>
        <div>
          <Label className="pl-3 pb-3" htmlFor="description">
            Description
          </Label>
          <Input
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            className="text-wrap break-words "
            id="description"
          />
        </div>
      </div>
      <Button
        variant="secondary"
        className="mx-auto rounded-full overflow-hidden h-16 w-16"
        onClick={() => createNewGroup()}
      >
        <Check />
      </Button>
    </div>
  );
};

export default NewGroupDetails;
