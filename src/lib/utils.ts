import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Fetch } from "./fetch";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function addMessageToDB(message: Message) {
  try {
    await Fetch.POST(`/messages`, { message });
  } catch (error: any) {
    console.error("error adding message to DB", error.message);
  }
}
