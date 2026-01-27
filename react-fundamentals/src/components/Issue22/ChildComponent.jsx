import { memo } from "react";

const Child = memo(function Child({ onIncrement }) {
  console.log("Children rendered")

  return (
    <button
      onClick={onIncrement}
      className="rounded bg-green-600 px-4 py-2 text-white"
    >
      Increment from Child
    </button>
  );
})

export default Child
