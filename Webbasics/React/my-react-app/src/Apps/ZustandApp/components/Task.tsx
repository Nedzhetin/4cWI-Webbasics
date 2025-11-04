import { type TaskType } from "../stores/taskStore";
import { useNameStore } from "../stores/nameStore";
import { useState } from "react";

function Task({ task }: { task: TaskType }) {
  const addName = useNameStore((state) => state.addName);
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="relative w-60 h-72 bg-red-300 m-2">
      <div className="absolute top-0 w-full h-32 bg-gray-400">{task.title}</div>
      <button className="absolute bottom-0 right-0">done</button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addName(inputValue);
          setInputValue("");
        }}
      >
        <input
          className="absolute w-full bottom-4 h-10"
          type="text"
          placeholder="Enter Name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </div>
  );
}

export default Task;
