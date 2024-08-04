import { useStore } from "@/lib/zustand";
import { useAuth } from "@/context/auth-provider";
import { useSocket } from "@/context/socket-provider";
import { ChangeEvent, useRef, useState } from "react";
import { useCreateGroupChat } from "@/hooks/useCreateGroupChat";
import { useUploadToCloudinary } from "@/hooks/useUploadToCloudinary";

import toast from "react-hot-toast";
import SyncLoader from "react-spinners/SyncLoader";
import InputBox from "@/components/sidebar/misc/input-box";
import ProfilePhoto from "@/components/profile/profile-photo";
import CheckButton from "@/components/sidebar/footer/check-button";

const NewGroupDetails = () => {
  const [groupDetails, setGroupDetails] = useState({
    groupName: "",
    groupPhoto: "/default-group.png",
    groupPhotoPublicId: "default-group",
    groupDescription: "",
  });

  const { selectedUsers, setCurrentChat, setSidebarType } = useStore();
  const { loading: createLoading, createGroupChat } = useCreateGroupChat();
  const { loading: uploadLoading, uploadToCloudinary } =
    useUploadToCloudinary();

  const socket = useSocket();
  const authUser = useAuth().authUser!;

  const fileInputRef = useRef<HTMLInputElement>(null);

  // handle create new group
  async function createNewGroup() {
    const { groupName, groupPhoto, groupPhotoPublicId, groupDescription } =
      groupDetails;

    const newChatDetails = {
      name: groupName,
      description: groupDescription,
      photo: groupPhoto,
      photoPublicId: groupPhotoPublicId,
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

  // open file input
  const openFileInput = () => {
    console.log("open file input");
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // handle file change
  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const { secure_url, public_id } = await uploadToCloudinary(file);

      setGroupDetails((prev) => ({ ...prev, groupPhoto: secure_url }));
      setGroupDetails((prev) => ({ ...prev, groupPhotoPublicId: public_id }));
    } catch (error: any) {
      toast.error("Error uploading photo", error.message);
    }
  };

  if (createLoading) {
    return (
      <div className="text-center">
        <SyncLoader size={10} className="my-10 mx-auto opacity-60" />
        Creating New Group Chat...
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-1 flex-col">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => handleFileChange(e)}
      />
      <div className="flex-1 space-y-6">
        <ProfilePhoto
          src={groupDetails.groupPhoto}
          onClick={openFileInput}
          className="h-60 w-60 mx-auto"
          loading={uploadLoading}
          hoverOverlay
        />
        <InputBox
          id="name"
          label="Group Title"
          value={groupDetails.groupName}
          onChange={(e) =>
            setGroupDetails((prev) => ({ ...prev, groupName: e.target.value }))
          }
          readOnly={false}
        />
        <InputBox
          id="description"
          label="Description"
          value={groupDetails.groupDescription}
          onChange={(e) =>
            setGroupDetails((prev) => ({
              ...prev,
              groupDescription: e.target.value,
            }))
          }
          readOnly={false}
        />
      </div>
      <CheckButton onClickHandler={createNewGroup} />
    </div>
  );
};

export default NewGroupDetails;
