import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-gray-100 p-6 shadow-md">
      <p className="text-lg text-gray-800">
        You have clicked the button <span className="font-semibold">{count}</span>{" "}
        times
      </p>

      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer"
      >
        Click me
      </button>
    </div>
  );
}

