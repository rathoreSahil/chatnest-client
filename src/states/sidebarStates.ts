import { create } from "zustand";

type SidebarStore = {
  sidebarType:
    | "chat"
    | "new-chat"
    | "select-group-members"
    | "group-details"
    | "profile";
  search: string;
  setSidebarType: (
    type:
      | "chat"
      | "new-chat"
      | "select-group-members"
      | "group-details"
      | "profile"
  ) => void;
  setSearch: (search: string) => void;
};

const useSidebarStore = create<SidebarStore>((set) => ({
  sidebarType: "chat",
  search: "",
  setSidebarType: (
    type:
      | "chat"
      | "new-chat"
      | "select-group-members"
      | "group-details"
      | "profile"
  ) => set({ sidebarType: type }),
  setSearch: (search: string) => set({ search }),
}));

export { useSidebarStore };
