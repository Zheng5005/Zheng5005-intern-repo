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
