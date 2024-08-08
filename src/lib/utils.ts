import { Fetch } from "./fetch";
import { MessageType } from "@/types";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function addMessageToDB(message: MessageType) {
  try {
    const resJson = await Fetch.POST("/messages", { message });
    return resJson.data;
  } catch (error: any) {
    console.error("Error saving message to DB", error.message);
    throw new Error("Error saving message to DB");
  }
}

export async function getAdminStatus(groupId: string): Promise<boolean> {
  try {
    const resJson = await Fetch.GET(`/participants/${groupId}`);
    return resJson.isAdmin;
  } catch (error: any) {
    console.error("Error fetching admin status", error.message);
    throw new Error(error.message);
  }
}

export async function updateChat(
  chatId: string,
  isGroupChat: boolean,
  chatDetails: any
): Promise<GroupChat | DirectChat> {
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
): string => {
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
): string | undefined => {
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
  for (const chat of chats) {
    if (
      !isGroupChat(chat) &&
      [chat.user1._id, chat.user2._id].includes(userId)
    ) {
      return chat;
    }
  }

  return null;
};
