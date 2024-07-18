import { Check } from "lucide-react";
import ProfilePhoto from "../profile/profile-photo";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useStore } from "@/lib/zustand";
import { useState } from "react";
import { Fetch } from "@/lib/fetch";
import { useAuth } from "@/context/auth-provider";
import { useSocket } from "@/context/socket-provider";

const NewGroupDetails = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const selectedUsers = useStore((state) => state.selectedUsers);
  const setCurrentChat = useStore((state) => state.setCurrentChat);
  const setChatModalType = useStore((state) => state.setChatModalType);

  const socket = useSocket();
  const { user: currentUser } = useAuth();

  // handle create new group
  async function createNewGroup() {
    // create new chat
    const newChatDetails = {
      name: groupName,
      description: groupDescription,
      photo: "/default-group.png",
      isGroupChat: true,
      participantCount: selectedUsers.length + 1,
    };

    const res = await Fetch.POST("/chats", newChatDetails);
    const newChat = res.data;
    const newChatId = res.data._id;

    // create new participants
    const tempData = selectedUsers.map((user) => {
      return { user: user._id, chat: newChatId };
    });

    const newParticipantsData = {
      participants: [...tempData, { user: currentUser!._id, chat: newChatId }],
    };

    await Fetch.POST("/participants", newParticipantsData);

    // trigger refresh event to update chat list of all participants
    socket?.emit("refresh", currentUser!._id);
    selectedUsers.forEach((user) => {
      socket?.emit("refresh", user._id);
    });

    setCurrentChat(newChat);
    setChatModalType("chat");
  }

  return (
    <div className="p-10 h-full flex flex-col justify-between">
      <div>
        <ProfilePhoto
          src="/default-group.png"
          className="h-52 w-52 opacity-90 mx-auto mb-16"
        />
        <div className="pb-6">
          <Label className="pl-3 pb-3 text-green-400" htmlFor="name">
            Group Title
          </Label>
          <Input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="border-0 text-md border-b border-white"
            id="name"
          />
        </div>
        <div>
          <Label className="pl-3 pb-3 text-green-400" htmlFor="description">
            Description
          </Label>
          <Input
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            className="border-0 text-md text-wrap break-words border-b border-white"
            id="description"
          />
        </div>
      </div>
      <Button
        variant="secondary"
        className="mx-auto mb-0 rounded-full overflow-hidden h-16 w-16 p-0"
        onClick={() => createNewGroup()}
      >
        <Check />
      </Button>
    </div>
  );
};

export default NewGroupDetails;
