import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Fetch } from "./fetch";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function addMessageToDB(message: Message) {
  try {
    await Fetch.POST("/messages", { message });
  } catch (error: any) {
    console.error("Error saving message to DB", error.message);
    throw new Error("Error saving message to DB");
  }
}

export async function getLoggedInParticipantDetails(groupId: string) {
  try {
    const res = await Fetch.GET(`/participants/${groupId}`);
    return res.participant;
  } catch (error: any) {
    console.error("Error fetching participant details", error.message);
    throw new Error("Error fetching participant details");
  }
}

export async function updateChat(
  chatId: string,
  isGroupChat: boolean,
  chatDetails: any
) {
  try {
    const resJson = isGroupChat
      ? await Fetch.PATCH(`/chats/group/${chatId}`, chatDetails)
      : await Fetch.PATCH(`/chats/direct/${chatId}`, chatDetails);

    return resJson.data;
  } catch (error: any) {
    console.error("Error updating chat", error.message);
    throw new Error("Error updating chat");
  }
}

export function isGroupChat(chat: DirectChat | GroupChat): chat is GroupChat {
  return (chat as GroupChat).participantCount !== undefined;
}

export const getChatName = (
  chat: GroupChat | DirectChat,
  authUserId: string
) => {
  const chatName = isGroupChat(chat)
    ? chat.name
    : authUserId === chat.user1._id
    ? chat.user2.name
    : chat.user1.name;

  return chatName;
};

export const getChatPhoto = (
  chat: GroupChat | DirectChat,
  authUserId: string
) => {
  const chatPhoto = isGroupChat(chat)
    ? chat.photo
    : authUserId === chat.user1._id
    ? chat.user2.photo
    : chat.user1.photo;

  return chatPhoto;
};

export const checkIfChatExists = (
  chats: (GroupChat | DirectChat)[],
  userId: string
): DirectChat | null => {
  chats.forEach((chat) => {
    if (
      !isGroupChat(chat) &&
      [chat.user1._id, chat.user2._id].includes(userId)
    ) {
      return chat;
    }
  });

  return null;
};
