import { Fetch } from "@/lib/fetch";
import { useCallback, useState } from "react";

type NewGroupChatDetailsType = {
  name: string;
  description: string;
  photo: string;
  photoPublicId: string;
  participantCount: number;
};

type CreateGroupChatHookType = {
  loading: boolean;
  createGroupChat: (
    newGroupChatDetails: NewGroupChatDetailsType,
    selectedUsers: User[],
    authUser: User
  ) => Promise<GroupChat>;
};

const useCreateGroupChat = (): CreateGroupChatHookType => {
  const [loading, setLoading] = useState<boolean>(false);

  const createGroupChat = useCallback(
    async (
      newGroupChatDetails: NewGroupChatDetailsType,
      selectedUsers: User[],
      authUser: User
    ): Promise<GroupChat> => {
      try {
        setLoading(true);
        // create new group chat
        const res = await Fetch.POST("/chats/group", newGroupChatDetails);
        const newChat = res.data;
        const newChatId = newChat._id;

        // create new participants
        const tempData = selectedUsers.map((user) => {
          return { user: user._id, group: newChatId };
        });

        const newParticipantsData = {
          participants: [
            ...tempData,
            { user: authUser._id, group: newChatId, isAdmin: true },
          ],
        };

        await Fetch.POST("/participants", newParticipantsData);

        return newChat;
      } catch (error: any) {
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, createGroupChat };
};

export default useCreateGroupChat;
