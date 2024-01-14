import { IMembership } from "@codernex/types";
import { create } from "zustand";

interface IModal {
  open: boolean;
  setOpen: (open: boolean, data?: IMembership) => void;
  data?: IMembership;
}

export const useMembershipModal = create<IModal>((set) => ({
  open: false,
  setOpen: (open, data) => set({ open: open, data }),
  data: undefined,
}));
