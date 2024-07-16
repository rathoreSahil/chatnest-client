import { create } from "zustand";

type Store = {
  chats: Chat[];
  chatModalType: "chat" | "new-chat" | "new-group-chat" | "profile";
  isRightPanelOpen: boolean;
  currentChat: Chat | User | null;
  search: string;

  setChats: (chats: Chat[]) => void;
  setChatModalType: (
    type: "chat" | "new-chat" | "new-group-chat" | "profile"
  ) => void;
  setIsRightPanelOpen: (isOpen: boolean) => void;
  setCurrentChat: (newChat: Chat | User) => void;
  setSearch: (search: string) => void;
};

const useStore = create<Store>()((set) => ({
  chats: [],
  chatModalType: "chat",
  isRightPanelOpen: false,
  currentChat: null,
  search: "",

  setChats: (chats: Chat[]) => set({ chats }),
  setChatModalType: (
    type: "chat" | "new-chat" | "new-group-chat" | "profile"
  ) => set({ chatModalType: type }),
  setIsRightPanelOpen: (isOpen: boolean) => set({ isRightPanelOpen: isOpen }),
  setCurrentChat: (newChat: Chat | User) => set({ currentChat: newChat }),
  setSearch: (search: string) => set({ search }),
}));

export { useStore };
