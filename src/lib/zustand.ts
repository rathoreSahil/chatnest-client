import { create } from "zustand";
import { Chat } from "@/lib/types";

type Store = {
  chatModalType: "chat" | "new-chat" | "new-group-chat" | "profile";
  currentChat: Chat | null;
  search: string;

  setChatModalType: (
    type: "chat" | "new-chat" | "new-group-chat" | "profile"
  ) => void;
  setCurrentChat: (newChat: Chat) => void;
  setSearch: (search: string) => void;
};

const useStore = create<Store>()((set) => ({
  chatModalType: "chat",
  currentChat: null,
  search: "",

  setChatModalType: (
    type: "chat" | "new-chat" | "new-group-chat" | "profile"
  ) => set({ chatModalType: type }),
  setCurrentChat: (newChat: Chat) => set({ currentChat: newChat }),
  setSearch: (search: string) => set({ search }),
}));

export { useStore };
