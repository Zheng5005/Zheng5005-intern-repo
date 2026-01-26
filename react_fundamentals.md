# Issue #32
## What challenges did you face during setup?
Because I already have exprience with react in personal projects I didn't have any challenges during set-up, but if I were new I think I would haave problems with:
- Choosing the tool to create the project, should I use **Vite** or **create-react-app**
    - In this case I choose **Vite** cause I'm more familiar with it and is more up to date with modern web development tools
# Issue #31
## Why are components important in React?
Components are a vital part in react, allow for re-usability, for example a Button component can be utilize in numerous part of the UI, and if something needs to change, it can be change only in the Button component file, which makes for a more maintainable code overall

Also separates responsibilities with this approach, by splitting the UI in reusable components, these components can be focused on only doing 1 thing and this also helps manage complexity and readability of the code.
Another benefits of components is that the collaboration between the team get improve by giving each people a set of components that will work.
## Tasks
I made the component `HelloWorld.js` in a directory called "components" in the src/ folder of the project this is the code (and uses TailwindCSS styles already):
```HelloWorld.js
export default function HelloWorld({name}) {
  return (
    <h1 className="text-3xl font-bold underline">{`Hello, ${name}`}</h1>
  )
}
```
And in the `App.jsx` file and called like this:
```App.jsx
import HelloWorld from './components/HelloWorld'

function App() {
  return (
    <>
      <HelloWorld name={"Focus Bear"}/>
    </>
  )
}

export default App
```
As you can see the HelloWorld component receives a name prop, which makes the name to render dynamically
# Issue 30
## What happens if we modify state directly instead of using setState?
- The page wouldn't reload, cause React relies in state updates, which are trigger by using the setState function
- The state model that React relies on assumes that state is immutable, so it would be a bad practice to change the state directly instead of using setState
- It can made some optimization obsolete
## Tasks
```Counter.js
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You have click the button {count} times</p>

      <button onClick={() => setCount((c) => c + 1)}>Click me</button> 
    </div>
  )
}
```
# Issue 29
## What are the advantages of using Tailwind CSS?
- A pre-defined framework, so there's no need to create CSS classes (unless you want a more custom look)
- Fast prototyping
- More style consistency throughout the project
- TailwindCSS removes all the un-utilize CSS, making for a better performance
## What are some potential pitfalls?
- It can made HTML/JXS code more messy by having too much classes
- A higher learning curve than just learning CSS
- It can lead to refactoring avoidance
- Is harder to enforce design rules
- It doesn't align very well with the philosophy of separation of concerns
## Tasks
```Counter.js
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
```
