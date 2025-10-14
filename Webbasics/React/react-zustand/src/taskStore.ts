import { create } from "zustand";

export type Task = {
  id: number;
  title: string;
  //setTitle: (title: string) => void;
  //toggleCompleted: () => void;
  completed: boolean;
};

export const useTaskStore = create<Task>((set) => ({
  id: 0,
  title: "",
  completed: false,
}));
