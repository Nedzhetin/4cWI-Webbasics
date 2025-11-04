import { type CounterStore, useCounterStore } from "./stores/countStore.ts";
import Counter from "./Counter.tsx";
import { type TaskType, useTaskStore } from "./stores/taskStore.ts";
import Task from "./Task.tsx";
import { useEffect } from "react";
import { useNameStore } from "./stores/nameStore.ts";

function App() {
  const count = useCounterStore((state: CounterStore) => state.count);
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const names = useNameStore((state) => state.names);

  useEffect(() => {
    useTaskStore.setState({ tasks: [] });
    addTask({ id: 1, title: "task 1", completed: false });
    addTask({ id: 2, title: "task 2", completed: false });
    addTask({ id: 3, title: "task 3", completed: false });
  }, []);

  return (
    <>
      <Counter count={count} />
      {tasks.map((task: TaskType) => (
        <Task key={task.id} task={task} />
      ))}

      <div>
        {names.map((name, index) => (
          <div key={index}>
            <p>{name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
