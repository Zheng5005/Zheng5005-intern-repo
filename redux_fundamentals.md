## When should you use Redux instead of useState?
The short answer would be when you want shared and global state throughout the whole app (you could use Redux, Zustand, Jotai, etc), and useState when you need a state that only a specific (or just a handful) component need the state

The advantages of Redux is that:
- Gives a single source of truth
- Explicit state transitions
- Easy to debug and trace

Specific scenarios where you would want to use Redux:
- State shared across many parts of the app (Auth user, Theme, language, etc)
- Complex state transitions
- When the business logic needs to be predictable (Finalcial apps, Admin panels, etc)
- You need debugging and a history (This can be accomplish with **React DevTools**)
- Complex async flows (multiple API calls, caching, etc)
## Tasks
I ran the command:
`npm install @reduxjs/toolkit react-redux` 

Then I configure the counter slice:
```counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```

Then I configure the global store, this approach also allows for more slice creation in the future:
```store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
```

I also imported the store to the main.jxs file and wrap the app with a Redux Provider
```main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import './utils/i18n.js'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
```

And this is the new Counter.jsx file that uses Redux store for the count value
```Counter.jsx
import { Trans } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../store/counterSlice";

export default function Counter() {
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-col items-center gap-4 rounded-lg bg-gray-100 p-6 shadow-md">
      <p className="text-lg text-gray-800">
        <Trans 
          i18nKey="counterText" 
          count={count} 
          components={{
            1: <span className="font-semibold" />
          }} />
      </p>

      <button
        type="button"
        onClick={() => dispatch(increment())}
        className="rounded-md bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:cursor-pointer"
      >
        Click me
      </button>
    </div>
  );
}
```
