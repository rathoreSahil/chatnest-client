import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Chat, User } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getChatsByUserId(
  userId: string
): Promise<Chat[] | undefined> {
  try {
    const res = await fetch(
      `http://localhost:3182/api/v1/participants/${userId}`
    );
    const resJson = await res.json();

    return resJson.data;
  } catch (error) {
    console.error("error fetching chats", error);
  }
}
