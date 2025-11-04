import { useCounterStore } from "./stores/countStore.ts";
import { useEffect } from "react";

const setCount = () => {
  useCounterStore.setState({ count: 10 });
};

function Counter({ count }: { count: number }) {
  const incrementAsync = useCounterStore((state) => state.incrementAsync);
  const decrement = useCounterStore((state) => state.decrement);

  useEffect(() => {
    setCount();
  }, []);

  return (
    <>
      <div className="text-3xl">{count}</div>
      <button className="m-10" onClick={incrementAsync}>
        increase Async
      </button>
      <button onClick={decrement}>decrease</button>

    </>
  );
}

export default Counter;
