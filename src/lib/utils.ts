import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Message } from "@/lib/types";
import { Fetch } from "./fetch";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getChatIdsByUserId(userId: string): Promise<string[]> {
  try {
    const resJson = await Fetch.GET(`/chats/chat-ids/${userId}`);
    return resJson.data;
  } catch (error: any) {
    console.error("error fetching chat ids", error.message);
    return [];
  }
}

export async function getMessagesByChatId(chatId: string): Promise<Message[]> {
  try {
    const resJson = await Fetch.GET(`/messages/${chatId}`);

    return resJson.data;
  } catch (error: any) {
    console.error("error fetching chats", error.messages);
    return [];
  }
}

export async function addMessageToDB(message: Message) {
  try {
    await Fetch.POST(`/messages`, { message });
  } catch (error: any) {
    console.error("error adding message to DB", error.message);
  }
}
