import { create } from "zustand";

type UserListStore = {
  users: User[];
  selectedUsers: User[];
  setUsers: (users: User[]) => void;
  setSelectedUsers: (selectedUsers: User[]) => void;
};

const useUserListStore = create<UserListStore>((set) => ({
  users: [],
  selectedUsers: [],
  setUsers: (users: User[]) => set({ users }),
  setSelectedUsers: (selectedUsers: User[]) => set({ selectedUsers }),
}));

export { useUserListStore };
