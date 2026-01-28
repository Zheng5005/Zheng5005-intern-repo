import { useEffect } from "react";
import { useState } from "react";

export default function BuggyComponent() { 
  let [count, setCount] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(id);
  },[]);

  return <h1>{count}</h1>;
}
