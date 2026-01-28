## What are the most common debugging techniques?
- Normally one can reproduce the exact steps that recreates the bug, this is the basic way of reporting a bug also, if you can't reproduce it, you can't fix it.
- Logs are also use as a way to debugging (although not the most recommended), in the pretty much all programming languages
- Breaking the bug into manageable little pieces (search for the bug in the state, props, API, etc) then isolate it (Replace dynamic data with static data, comment out code, etc)
- Use git bisect, this can make searching for the bug a little bit easier.
## Which tools are most effective for React debugging?
- **React DevTools**: It is use to: 
    - Inspect props and state
    - See component hierarchy
    - Detect unnecessary re-renders
    - Etc.
- **React DevTools Profiler**: Is is use to debug performance issues in React, it helps to answer:
    - Which component re-rendered?
    - Why did it re-render?
    - How long did it take?
- **Browser DevTools**: One the most crucial tool to debug web apps, you can have access to the console, network debug for API request, access to localstorage, etc
## How do you debug issues in large React codebases?
1. **You need to understand the codebase**, maybe not to the T, but at least a general idea, so you can have better debugging experience
2. **Trace the bug**: You need see the flow of the app, where is the bug?, it appers when you make an API request?, it appears when the state changes?
3. **Narrow the scope**: Isolate as much as possible to determine where the bug is, it helps to find the smallest component where the bug appears.
4. **Use mock data if necessary**:if you can use mock data, if the bug dissapears when you use this mock, it means is a API layer bug.
5. **Keep in mind useEffect**: useEffect hook is common source of bugs in react apps
6. **Write tests**: When you fix the bug, write a test to ensure that bug isn't going to appear in the future
7. **Use `git bisect`** 
## Tasks
### Error boundaries in React
If we don't handle the errors in React, the UX can be affected by the error breaking the whole UI, to dodge that and to hanled this things we can use Error boundaries, this boundaries can catch any errors in the tree component and show a fallback UI

Heres an example of a ErrorBoundary component:
```ErrorBoundary.jsx
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('Error caught by ErrorBoundary: ', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

although there's already a package that simplyfies this process called: `react-error-boundary`, is also recommended by the official React documentation  
### Debugging performance issues using React Profiler
You can record thw whole flow of a React app with this tool, but 1 use I already applied is seeing the components that re-render when a state changes, so that I can debug where is the performance optimization needed, for this I activated the highlights when this action happens (see ./proofs/ReactDevTools.png)
