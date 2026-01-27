import { useMemo, useState } from "react";
import { initialItems } from "../utils/largeList";

export default function SlowAndOptimized() {
  const [count, setCount] = useState(0)
  const [items] = useState(initialItems)

  const selectedItem = useMemo(
    () => items.find((item) => item.id === count),
    [count, items],
  );

  return (
    <div className='tutorial'>
      <h1 className="text-lg text-gray-800">
        Count: {count}
      </h1>
      <h1 className="text-lg text-gray-800">
        Selected Item: {selectedItem?.id}
      </h1>
      <button 
        className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer"
        onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

