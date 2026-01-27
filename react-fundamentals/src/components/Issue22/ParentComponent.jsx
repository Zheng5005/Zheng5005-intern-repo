import { useCallback, useState } from "react";
import Child from "./ChildComponent";

export default function Parent() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);
  
  // Without useCallback it will cause the Chid component to re-render
  //function increment() {
    //setCount((c) => c + 1)
  //}

  console.log("👨 Parent rendered");

  return (
    <div className="space-y-4 p-4">
      <p>Count: {count}</p>

      <button
        onClick={() =>
          setTheme((t) => (t === "light" ? "dark" : "light"))
        }
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Toggle Theme
      </button>

      <Child onIncrement={increment} />
    </div>
  );
}
