import { create } from "zustand";

type Store = {
  chats: (GroupChat | DirectChat)[];
  users: User[];
  selectedUsers: User[];
  sidebarType:
    | "chat"
    | "new-chat"
    | "select-group-members"
    | "group-details"
    | "profile";
  isRightPanelOpen: boolean;
  currentChat: GroupChat | DirectChat | null;
  search: string;
  tempChat: User | null;

  addNewChat: (newChat: GroupChat | DirectChat) => void;
  setChats: (chats: (GroupChat | DirectChat)[]) => void;
  reorderChats: (id: string, messageContent: string) => void;
  setUsers: (users: User[]) => void;
  setSelectedUsers: (selectedUsers: User[]) => void;
  setSidebarType: (
    type:
      | "chat"
      | "new-chat"
      | "select-group-members"
      | "group-details"
      | "profile"
  ) => void;
  setIsRightPanelOpen: (isOpen: boolean) => void;
  setCurrentChat: (newChat: GroupChat | DirectChat) => void;
  setSearch: (search: string) => void;
  setTempChat: (user: User | null) => void;
};

const useStore = create<Store>()((set, get) => ({
  chats: [],
  users: [],
  selectedUsers: [],
  sidebarType: "chat",
  isRightPanelOpen: false,
  currentChat: null,
  search: "",
  tempChat: null,

  addNewChat: (newChat: GroupChat | DirectChat) =>
    set((state) => ({ chats: [...state.chats, newChat] })),
  setChats: (chats: (GroupChat | DirectChat)[]) => set({ chats }),
  reorderChats: (id: string, messageContent: string) => {
    const chats = get().chats;
    const removed = chats.find((chat) => chat._id === id);
    if (!removed) return;
    const filteredChats = chats.filter((chat) => chat._id !== id);
    removed.lastMessage = messageContent;
    set({ chats: [removed, ...filteredChats] });
  },
  setUsers: (users: User[]) => set({ users }),
  setSelectedUsers: (selectedUsers: User[]) => set({ selectedUsers }),
  setSidebarType: (
    type:
      | "chat"
      | "new-chat"
      | "select-group-members"
      | "group-details"
      | "profile"
  ) => set({ sidebarType: type }),
  setIsRightPanelOpen: (isOpen: boolean) => set({ isRightPanelOpen: isOpen }),
  setCurrentChat: (newChat: GroupChat | DirectChat) =>
    set({ currentChat: newChat }),
  setSearch: (search: string) => set({ search }),
  setTempChat: (user: User | null) => set({ tempChat: user }),
}));

export { useStore };
