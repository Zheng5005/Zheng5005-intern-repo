## What was the issue?
This issue was that the BuggyComponent was supposed to increment by 1 every second, but when is mounted, it only increment by 1 and then it stops there

This was caused 
## What debugging method did you use?
First I use the **React DevTools** to see the component tree, I also increment the interval to 3 seconds to give me more time to see why it doesn't work, I didn't see anything useful

Then I use the profiler, with the new interval of 3 seconds I recorded the component rendering and I algo enable the message that tells you why a component re-renders, again I didn't see anythin useful

Then I thought about it has something to do with the useEffect hook, so I search for the official documentation, but I didn't anything, even if I search for related with Hooks in general, so I resorted to an AI
## How did you resolve the problem?
I ask the AI to search for any bug in the code and if so, explain the bug to me, It immediately saw the bug, the problem was something to do with JS itself, every time the component is mounted, a stale closure was created, this is a expected behavior in React

React hooks allows you to update a state, but React "remembers" the previous state, so in this case when you update the state like this:
```js
() => {
    setCount(count + 1)
}
```
It only remembers the value of `count` from the render where it was created (meaaning 0 in this case)

The fix was pretty simple just replace that specific line with this other code that follows best React practices:
`setCount((prev) => prev + 1)` 

Previous Buggy code:
```BuggyComponent.jsx
import { useEffect } from "react";
import { useState } from "react";

export default function BuggyComponent() { 
  let [count, setCount] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(id);
  },[]);

  return <h1>{count}</h1>;
}
```

Functional code:
```BuggyComponent.jsx
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
```
