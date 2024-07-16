import { create } from "zustand";

type Store = {
  chats: Chat[];
  chatModalType: "chat" | "new-chat" | "new-group-chat" | "profile";
  currentChat: Chat | User | null;
  search: string;

  setChats: (chats: Chat[]) => void;
  setChatModalType: (
    type: "chat" | "new-chat" | "new-group-chat" | "profile"
  ) => void;
  setCurrentChat: (newChat: Chat | User) => void;
  setSearch: (search: string) => void;
};

const useStore = create<Store>()((set) => ({
  chats: [],
  chatModalType: "chat",
  currentChat: null,
  search: "",

  setChats: (chats: Chat[]) => set({ chats }),
  setChatModalType: (
    type: "chat" | "new-chat" | "new-group-chat" | "profile"
  ) => set({ chatModalType: type }),
  setCurrentChat: (newChat: Chat | User) => set({ currentChat: newChat }),
  setSearch: (search: string) => set({ search }),
}));

export { useStore };
