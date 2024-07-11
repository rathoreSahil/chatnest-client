import { create } from "zustand";
import { Chat, Message } from "@/lib/types";

type Store = {
  isNewChatModalOpen: boolean;
  currentChat: Chat | null;
  search: string;

  setIsNewChatModalOpen: (open: boolean) => void;
  setCurrentChat: (newChat: Chat) => void;
  setSearch: (search: string) => void;
};

const useStore = create<Store>()((set) => ({
  isNewChatModalOpen: false,
  currentChat: null,
  search: "",

  setIsNewChatModalOpen: (open: boolean) => set({ isNewChatModalOpen: open }),
  setCurrentChat: (newChat: Chat) => set({ currentChat: newChat }),
  setSearch: (search: string) => set({ search }),
}));

export { useStore };
