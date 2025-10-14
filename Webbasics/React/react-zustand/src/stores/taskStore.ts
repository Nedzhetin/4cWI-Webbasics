import { create } from "zustand";

export type TaskType = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskStore = {
  tasks: TaskType[];
  addTask: (task: TaskType) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task: TaskType) =>
    set((state) => ({ tasks: [...state.tasks, task] })),
}));
