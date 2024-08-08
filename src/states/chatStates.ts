import { create } from "zustand";

type ChatStore = {
  currentChat: GroupChat | DirectChat | null;
  tempChat: User | null;
  setCurrentChat: (newChat: GroupChat | DirectChat) => void;
  setTempChat: (user: User | null) => void;
};

const useChatStore = create<ChatStore>((set, get) => ({
  currentChat: null,
  tempChat: null,
  setCurrentChat: (newChat: GroupChat | DirectChat) =>
    set({ currentChat: newChat }),
  setTempChat: (user: User | null) => set({ tempChat: user }),
}));

export { useChatStore };
