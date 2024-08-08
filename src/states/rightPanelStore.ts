import { create } from "zustand";

type RightPanelStore = {
  isRightPanelOpen: boolean;
  setIsRightPanelOpen: (isOpen: boolean) => void;
};

const useRightPanelStore = create<RightPanelStore>()((set, get) => ({
  isRightPanelOpen: false,
  setIsRightPanelOpen: (isOpen: boolean) => set({ isRightPanelOpen: isOpen }),
}));

export { useRightPanelStore };
