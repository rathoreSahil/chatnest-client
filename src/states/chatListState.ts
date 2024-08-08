import { create } from "zustand";

type ChatListStore = {
  chats: (GroupChat | DirectChat)[];
  addNewChat: (newChat: GroupChat | DirectChat) => void;
  setChats: (chats: (GroupChat | DirectChat)[]) => void;
  reorderChats: (id: string, messageContent: string) => void;
};

const useChatListStore = create<ChatListStore>((set, get) => ({
  chats: [],
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
}));

export { useChatListStore };
