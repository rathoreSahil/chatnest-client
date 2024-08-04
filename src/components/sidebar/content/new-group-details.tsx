import { useAuth } from "@/context/auth-provider";
import { useStore } from "@/lib/zustand";
import { useState } from "react";
import { useSocket } from "@/context/socket-provider";

import toast from "react-hot-toast";
import SyncLoader from "react-spinners/SyncLoader";
import InputBox from "@/components/sidebar/misc/input-box";
import useCreateGroupChat from "@/hooks/useCreateGroupChat";
import ProfilePhoto from "@/components/profile/profile-photo";
import CheckButton from "@/components/sidebar/footer/check-button";

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
    <div className="p-10 flex flex-1 flex-col">
      <div className="flex-1">
        <ProfilePhoto
          src="/default-group.png"
          className="h-52 w-52 opacity-90 mx-auto mb-16"
        />
        <InputBox
          id="name"
          label="Group Title"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          readOnly={false}
        />
        <InputBox
          id="description"
          label="Description"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          readOnly={false}
        />
      </div>
      <CheckButton onClickHandler={createNewGroup} />
    </div>
  );
};

export default NewGroupDetails;
