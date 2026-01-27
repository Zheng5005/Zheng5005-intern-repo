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
