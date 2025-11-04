import { create } from "zustand";

export type NameStore = {
  names: string[];
  addName: (name: string) => void;
};

export const useNameStore = create<NameStore>((set) => ({
  names: [],
  addName: (state: string) =>
    set((prev) => ({ names: [...prev.names, state] })),
}));
