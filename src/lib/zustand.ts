import { create } from "zustand";
import { Chat } from "@/lib/types";

type Store = {
  currentChat: Chat | null;
  search: string;

  setCurrentChat: (newChat: Chat) => void;
  setSearch: (search: string) => void;
};

const useStore = create<Store>()((set) => ({
  currentChat: null,
  search: "",

  setCurrentChat: (newChat: Chat) => set({ currentChat: newChat }),
  setSearch: (search: string) => set({ search }),
}));

export { useStore };
