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
