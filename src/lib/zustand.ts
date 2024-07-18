import { create } from "zustand";

type Store = {
  chats: Chat[];
  users: User[];
  selectedUsers: User[];
  chatModalType:
    | "chat"
    | "new-chat"
    | "select-group-members"
    | "group-details"
    | "profile";
  isRightPanelOpen: boolean;
  currentChat: Chat | User | null;
  search: string;

  setChats: (chats: Chat[]) => void;
  setUsers: (users: User[]) => void;
  setSelectedUsers: (selectedUsers: User[]) => void;
  setChatModalType: (
    type:
      | "chat"
      | "new-chat"
      | "select-group-members"
      | "group-details"
      | "profile"
  ) => void;
  setIsRightPanelOpen: (isOpen: boolean) => void;
  setCurrentChat: (newChat: Chat | User) => void;
  setSearch: (search: string) => void;
};

const useStore = create<Store>()((set) => ({
  chats: [],
  users: [],
  selectedUsers: [],
  chatModalType: "chat",
  isRightPanelOpen: false,
  currentChat: null,
  search: "",

  setChats: (chats: Chat[]) => set({ chats }),
  setUsers: (users: User[]) => set({ users }),
  setSelectedUsers: (selectedUsers: User[]) => set({ selectedUsers }),
  setChatModalType: (
    type:
      | "chat"
      | "new-chat"
      | "select-group-members"
      | "group-details"
      | "profile"
  ) => set({ chatModalType: type }),
  setIsRightPanelOpen: (isOpen: boolean) => set({ isRightPanelOpen: isOpen }),
  setCurrentChat: (newChat: Chat | User) => set({ currentChat: newChat }),
  setSearch: (search: string) => set({ search }),
}));

export { useStore };
