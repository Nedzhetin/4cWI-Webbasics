import { type TaskType } from "./stores/taskStore.ts";

function Task({ task }: { task: TaskType }) {
  return (
    <div className="relative w-60 h-72 bg-red-300 m-2">
      <div className="absolute top-0 w-full h-32 bg-gray-400">{task.title}</div>
      <button className="absolute bottom-0 right-0">done</button>
    </div>
  );
}

export default Task;
