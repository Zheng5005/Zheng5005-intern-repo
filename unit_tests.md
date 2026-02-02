# Issue #19
## Why is automated testing important in software development?
- Allows to catch bugs in early stages
- Prevent regressions, meaning that they ensure that:
    - Old features keep working
    - New changes don't break unrelated parts
    - Refactors are safe
- It makes refactor easier
- It helps to enforce clean code best practices
- It can be used a documentation, by writing and reading clear test, one can get an idea on how the app should work, the edge cases and constraints and expected inputs and outputs
- Speeds up development in the long run, although at the beggining writting tests could seem more time-consuming, it helps reducing debugging time, manual testing and loops where you fix one thing and you break 3 others
- It can make PR reviews easier, by adding test you can set up a CI pipeline to test the code, and provides more trust to ensure a PR doesn't break anything else
## What did you find challenging when writing your first Jest test?
I think at first it was challenging to set up Jest, manly cause it was incompatible with Vite, so I choose Vitest as an alternative, and it doesn't change much cause Vitest is compatible with the Jest API
Other than that, I think it was easy to write the test, it also helped that I already did this types of tests in Milestones #4
## Tasks
Because I'm running my project with Vite (which doesn't integrate well with Jest), I choose Vitest as a alternative, This package for testing is also compatible with the API of Jest (describe, it, expect, mocks, etc.)

First I ran:
`npm install -D vitest` 

Then I wrote the simple function that adds two numbers:
```js
export function sum(a, b) {
  return a + b
}
```
and in the package.json of my project I added a script to run the tests:
```js
{
  "scripts": {
    "test": "vitest" 
  },
}
```

Then I wrote the unit test fot the sum function:
```js
import { expect, test } from "vitest";
import { sum } from "../src/utils/sum";

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1,2)).toBe(3)
})
```

And to run the test and see the results in the terminal I ran:
`npm test` 

To see the screenshot of the result see ./proofs/Issue19.png
# Issue #18
## What are the benefits of using React Testing Library instead of testing implementation details?
- Your tests don't break during refactors, this is because in the future you decide to refactor a component into multiple components, if you use implementation details, your test is going to break
- The test can reflect real user behavior
- Encourages accessibility, if you can't find a element by role or name, it means it has poor accessibility
- Less mocks, the test with React testing-library focus on result rather than internal mechanics
- Tests are easier to read and understand
## What challenges did you encounter when simulating user interaction?
1. I didn't know that the user events are manage by another Library that I had to install
2. Also I didn't thought that the function containing the user interaction must by an async function, something that in retrospective makes sense
3. I thought that I need to render the component in every test, but later found out that the render function in the first test makes all the work
## Setup challenges
At first I thought testing React components with Vitest will be easy, until it wasn't:
1. The first problem that I had is that React testing Library work better with Jest, so I have to search for documentation regarding running the Library without Jest
2. After I stumble across documentation, I started following it, but I felt very lost
3. The test environment wasn't working, so I started installing and uninstalling packages
4. One of those packages should have not been there to begin with, and it was causing a clash between other components
5. I restore everything with `git restore .`
6. I started doing everything again
7. After all this 2 hours of debugging, the Library started to work out
## Tasks
I ran the following command:
`npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event` 

I wrote the simple components that renders a message:
```js
import { useState } from "react";

export default function Message() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Message from component</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </>
  )
}
```

After that I wrote the test to see if it renders correctly (Message.spec.jsx):
```js
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Message from "../src/components/Message";
import '@testing-library/jest-dom/vitest';
import userEvent from "@testing-library/user-event";

describe("Message", () => {
  it("render the component", () => {
    render(<Message />)
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
  })

  it("increments the count when the button is clicked", async () => {
    const user = userEvent.setup()
    const button = screen.getByRole("button", { name: /increment/i });

    await user.click(button)

    expect(screen.getByText("Count: 1")).toBeInTheDocument()
  })
})
```

IMPORTANT NOTE: this line of code `import '@testing-library/jest-dom/vitest';` is crucial to have it somewhere in the project, in a separate config file or in every test file, cause this import everything you need to run the DOM API that simulates a browser in order to test your components
# Issue #17
## Why is it important to mock API calls in tests?
- Makes sure that the response is consistent, cause a real API can be slow o can go down, mocking an API response ensures that every time you pass the same inputs, the component has a consistent response to that
- To adds more to the previous point, a real request can be also slow and hard to run in a CI pipeline, mocks run instantly
- You don't depend on external dependencies, meaning that aa API can change or your Wi-Fi can bad, but this can't be the reason that your test fails 
- You can test edge cases, for example a "Server Error" response
## What are some common pitfalls when testing asynchronous code?
- Forgetting that the testing function needs to be asynchronous
- To add more, when you expect something (an UI change, re-rendering, etc) you need to remenber to add "await" to it, cause the function is asynchronous
- Using "getBy" function instead of "findBy", the latter is use to get async UI changes
- Similar to the second pitfall, you need to add "await" to every user event, like a user clicking a button and fire a fetch action
- Forgetting that state changes are not instant, so you need to remenber not to assert too early
- Forgetting to clean between every test, this can make one test to affect another
## Tasks
I wrote the MockAPIComponent that fetches an API when the user clicks a button:
```js
import { useEffect, useState } from "react";

export default function MockAPIComponent() {
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
    const controller = new AbortController();

    return () => {
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

Then I wrote the test that Mock the API response and also simulates the user interaction (click a button)
```js
import { beforeEach, describe, expect, it, vi } from "vitest";
import '@testing-library/jest-dom/vitest';
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import MockAPIComponent from "../src/components/MockAPIComponent";

describe("MockAPIComponent", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("fetches data and displays it after clicking the button", async () => {
    // Mocking API response
    const mockResponse = {
      id: 1, 
      title: "Mocked todo",
      completed: false,
    }

    vi.spyOn(global, "fetch").mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    })

    // Rendering component
    render(<MockAPIComponent />)

    // Clicking the button that fire the fetch action
    const button = screen.getByRole("button", { name: /fetch data/i })
    await userEvent.click(button)

    // Assert UI updates
    expect(await screen.findByText("ID: 1")).toBeInTheDocument()
    expect(screen.getByText("Title: Mocked todo")).toBeInTheDocument()
    expect(screen.getByText("Completed: false")).toBeInTheDocument()

    // Assert fetch was called
    expect(global.fetch).toHaveBeenCalledOnce()
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos/1",
      expect.any(Object)
    )
  })
})
```
# Issue #16
## What was the most challenging part of testing Redux?
- Understanding what needs test, and what not, every Redux layer needs it's own testing methods
    - Reducers (pure logic)
    - Action creators / thunks (side effects)
    - Selectors (derived data)
    - Components connceted to Redux
- Testing async logic
- Mocking the store, one best practice is to use a real store with a test reducer
- Not using selectors to access pretty nested data
- Over-testing implementation details
## How do Redux tests differ from React component tests?
React components tests usually focus on testing what the user sees and does, it focus on UI, command things to test here:
    - Text on screen
    - Buttons
    - Inputs
    - etc

On the other hand Redux tests often focus on testing the state transitions and business logic, command things to test:
    - Reducers
    - Selectors
    - Thunks
    - Components connected to a Redux store
## Tasks
This is the slice to test, I made with synchronous and asynchronous actions in order to test both
```js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId, {rejectWithValue}) => {
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      if(!res.ok) {
        throw new Error('Failed to fetch user')
      }
      const data = await res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload)
    },
    clearUsers: (state) => {
      state.users = [];
      state.currentUser = null;
    },
    // Normal synchronous action
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload
        const exists = state.users.find(user => user.id === action.payload.id)
        if (!exists) {
          state.users.push(action.payload)
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export const { addUser, clearUsers, setCurrentUser } = userSlice.actions
export default userSlice.reducer
```

and this is the test file I created to test the previous Slice:
```js
import { beforeEach, describe, expect, it } from "vitest";
import userReducer, { addUser, clearUsers, fetchUser, setCurrentUser } from '../src/store/userSlice'

describe('userSlice', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      currentUser: null,
      users: [],
      loading: false,
      error: null,
    }
  })

  // Sync actions
  describe('sync actions', () => {
    it('should handle addUser action', () => {
      const newUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      const action = addUser(newUser);
      const state = userReducer(initialState, action);

      expect(state.users).toHaveLength(1)
      expect(state.users[0]).toEqual(newUser)
    })

    it('should add multiple users', () => {
      let state = initialState;
      state = userReducer(state, addUser({ id: 1, name: 'User 1' }));
      state = userReducer(state, addUser({ id: 2, name: 'User 2' }));

      expect(state.users).toHaveLength(2);
      expect(state.users[1].name).toBe('User 2');
    });

    it('should handle clearUsers action', () => {
      const stateWithUsers = {
        ...initialState,
        users: [
          { id: 1, name: 'User 1' },
          { id: 2, name: 'User 2' }
        ],
        currentUser: { id: 1, name: 'User 1' }
      };

      const state = userReducer(stateWithUsers, clearUsers());

      expect(state.users).toHaveLength(0);
      expect(state.currentUser).toBeNull();
    });

    it('should handle setCurrentUser action', () => {
      const user = { id: 1, name: 'Jane Doe', email: 'jane@example.com' };
      const action = setCurrentUser(user);
      const state = userReducer(initialState, action);

      expect(state.currentUser).toEqual(user);
    });
  })

  // Async actions
  describe('fetchUser async action', () => {
    it('should set loading to true when fetchUser is pending', () => {
      const action = { type: fetchUser.pending.type };
      const state = userReducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should update state when fetchUser is fulfilled', () => {
      const mockUser = { 
        id: 1, 
        name: 'John Doe', 
        email: 'john@example.com' 
      };
      const action = { 
        type: fetchUser.fulfilled.type, 
        payload: mockUser 
      };
      const state = userReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.currentUser).toEqual(mockUser);
      expect(state.users).toContainEqual(mockUser);
      expect(state.error).toBeNull();
    });

    it('should not add duplicate users when fetchUser is fulfilled', () => {
      const mockUser = { id: 1, name: 'John Doe' };
      const stateWithUser = {
        ...initialState,
        users: [mockUser]
      };
      
      const action = { 
        type: fetchUser.fulfilled.type, 
        payload: mockUser 
      };
      const state = userReducer(stateWithUser, action);

      expect(state.users).toHaveLength(1);
    });

    it('should set error when fetchUser is rejected', () => {
      const errorMessage = 'Failed to fetch user';
      const action = { 
        type: fetchUser.rejected.type, 
        payload: errorMessage 
      };
      const state = userReducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error).toBe(errorMessage);
      expect(state.currentUser).toBeNull();
    });
  });
})
```
