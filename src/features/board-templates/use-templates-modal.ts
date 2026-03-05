import { create } from "zustand";

interface TemplatesModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useTemplatesModalStore = create<TemplatesModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export function useTemplatesModal() {
  return useTemplatesModalStore();
}
