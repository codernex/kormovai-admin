import { create } from "zustand";

interface IUseSidebar {
  open: () => void;
  isSidebarActive: boolean;
}

export const useSidebar = create<IUseSidebar>((set) => ({
  isSidebarActive: true,
  open: () =>
    set((state) => ({
      isSidebarActive: !state.isSidebarActive,
    })),
}));
