import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Chat, Message, User } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getChatIdsByUserId(userId: string): Promise<string[]> {
  try {
    const res = await fetch(
      `http://localhost:3182/api/v1/chats/chat-ids/${userId}`
    );
    const resJson = await res.json();

    return resJson.data;
  } catch (error) {
    console.error("error fetching chat ids", error);
    return [];
  }
}

export async function getChatsByUserId(userId: string): Promise<Chat[]> {
  try {
    const res = await fetch(`http://localhost:3182/api/v1/chats/${userId}`);
    const resJson = await res.json();

    return resJson.data;
  } catch (error) {
    console.error("error fetching chats", error);
    return [];
  }
}

export async function getMessagesByChatId(chatId: string): Promise<Message[]> {
  try {
    const res = await fetch(`http://localhost:3182/api/v1/messages/${chatId}`);
    const resJson = await res.json();

    return resJson.data;
  } catch (error) {
    console.error("error fetching chats", error);
    return [];
  }
}

export async function addMessageToDB(message: Message) {
  try {
    await fetch(`http://localhost:3182/api/v1/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
  } catch (error) {
    console.error("error adding message to DB", error);
  }
}
