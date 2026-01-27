# Issue #24
## When should you use useEffect instead of handling logic inside event handlers?
When the logic is a **side effect** (a operation that interact with "the outside world", meaning anything that is outside of the component scope) that should happen when a state change is trigger, for a example making a fetch to an API that provides important info to the UI when the component is mounted, or if the state of any variable (useState) is changed for some reason
## What happens if you don’t provide a dependency array?
It can run indefinitely, cause the effect will run in every re-render and everytime the state changes, but every state change triggers re-rendering in React, this makes a infinite loop of re-renderings that will break the app.
## How can improper use of useEffect cause performance issues?
- It can cause an infinite loop if you are not careful
- It can cause unnecessary API calls, expensives calculations or unnecessary DOM manipulation
- If there's no cleanup functions, it can lead to memory leaks, for example a interval that doesn't have a cleanup function can make the app un-optimized
- If you have expensives calculations in the hook, it can lead to performance issues.
## Tasks
This is the component that checks the following checklist:
- Logs a message when it mounts and unmounts.
- Fetches data from an API when a button is clicked.
- Implements a cleanup function.

```EffectComponent.jsx
import { useEffect, useState } from "react";

export default function EffectComponent() {
  const [data, setData] = useState(null);

  async function fetchAPI(signal) {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1",
        { signal }
      );
      const json = await response.json();
      setData(json);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Fetch failed:", error);
      }
    }
  }

  useEffect(() => {
    console.log("EffectComponent mounted");

    const controller = new AbortController();

    return () => {
      console.log("EffectComponent unmounted");
      controller.abort(); // cleanup
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {data && (
        <div className="rounded-md bg-gray-100 p-4">
          <p>ID: {data.id}</p>
          <p>Title: {data.title}</p>
          <p>Completed: {String(data.completed)}</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => fetchAPI()}
        className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Fetch Data
      </button>
    </div>
  );
}
```
# Issue #23
## How does useMemo improve performance?
It does it by caching the result of a expensive computation, and it only re-runs it when its dependencies change, for exmple if we run aa expensive computation when a User makes a logIn to its account, it will be very slow every time the component re-renders (even if the expensive computation dependencies haven't changed).

In this case it would be smart to use the useMemo hook, this will make the component slow only in it's first render, after that (and the dependencies haven't change) it will faster than before.
## When should you avoid using useMemo?
- If the component rarely re-renders
- The dependencies change on every render
- At the beggining of the project, early optimization can lead to bugs in the long run
- If the code only works with useMemo hooks, by the React documentation itself: "You should only rely on useMemo as a performance optimization. If your code doesn’t work without it, find the underlying problem and fix it first. Then you may add useMemo to improve performance."
## What happens if you remove useMemo from your implementation?
It still runs, but every time the component re-renders, it gets a little slower, and it becomes noticeably when you click numerous times the button, the component gets laggier and laggier the more you click, until it catches up to the state.
## Thoughts
useMemo, although a really good tool to solve performance issues, is often consider not necessary for small to medium size projects, not because optimization is overated, but because the majority of projects don't do really expensive calculation that can lead to a poor UX experience.

Also is worth mention that it provides more headache than security, meaning that the drawbacks of using this hook in a wrong way, could lead to more bugs and, ironically, poor performance in the long run.
## Tasks
This is the component:
```SlowAndOptimized.jsx
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
```

And this is the helper function that creates an big list:
```largeList.js
export const initialItems = new Array(10000).fill(0).map((_, i) => {
  return {
    id: i,
    isSelected: i === 29_999_998,
  };
});
```
