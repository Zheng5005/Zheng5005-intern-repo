Clean code puts emphasis on writing code that is not only readable for computers, but also for humans, as more often than not, code is more often read than written, for this purpose clean code follow some principles that can be summarized as: 
- **Simplicity**: The code should be simple and focused, try to avoid over-complicated lines just to seem more clever.
- **Readability**: A clean code should be easy to read, like you're reading a well-written book, this makes the code understandable by anyone on the team, which means the code will be easier to maintain and extend in the long run
- **Maintainability**: a clean code should be easy to read, test, extend and modify, your future self and your co-workers will thank you for it, you can achieve this by:
	- Naming your variables with meaningful names
	- Writing small focused functions
	- Avoiding tricky one-liners if is too difficult to read, following the **Readability** principle
- **Consistency**: This is different in every project, but is important to follow the style and conventions of the project you are working on, a project with many files with a whole different style of writing code can be overwhelming and hard to maintain.
- **Efficiency**: Performance matters, but clean code favors simple, clear solutions over over-engineering. Optimize when necessary, but avoid designing overly complex solutions for problems that may never exist.
---
## What makes a good variable or function name?
- It clearly communicates intent, the person reading the code needs to be able to understand it without extra comments
- They are descriptive and specific
- Have consistency conventions (camelCase, PascalCase, etc)
- If the function is action based, it in the name (fetchUsers, getData, etc)
- If the variable is a boleean should reflect that (prefix with: is, has, can, should)
## What issues can arise from poorly named variables?
- It could lead to confusion
- It could lead to bugs cause of the misunderstanding of an implementation
- It makes code reviews slower cause of the extra mental load that required to understand the code 
- It makes refactoring harder
## How did refactoring improve code readability
- Now it has a understandable goal
- It can be understandable without testing and making questions
- It now can be code review and change more easily
---
## Why is breaking down functions beneficial?
- Functions become easier to debug and read
- If a change is required it can be done in the specific function that has that responsibility
- By splitting the function into smaller ones, you can handle different and reusable responsibilities
## How did refactoring improve the structure of the code?
- Now it can be debug with more ease
- If a change is needed it can be done more easily
- Every mini-function follow clean code principles, making things easier to understand
## Tasks
You can see the files I made for this Issue in: https://github.com/Zheng5005/Zheng5005-intern-repo/commit/974f4414be8c97d826da3c2c1890366e6402475c

But the original long function was:
```longFunction.js
// Example of a long and hard to follow function
function process(a, b, c, d) {
  let r = 0;
  let t = 0;
  let f = false;

  for (let i = 0; i < a.length; i++) {
    if (a[i].x === b) {
      if (a[i].y > c) {
        if (d) {
          r += a[i].y * 0.15;
        } else {
          r += a[i].y * 0.1;
        }
        t++;
      } else {
        if (a[i].z) {
          r += 5;
        }
      }
    } else {
      if (a[i].y < 0) {
        console.log("error");
        f = true;
      }
    }

    if (a[i].n === "A") {
      r += 2;
    } else if (a[i].n === "B") {
      r += 4;
    } else if (a[i].n === "C") {
      r += 6;
    }

    if (t > 10) {
      r -= 3;
    }
  }

  if (f) {
    console.log("Something went wrong");
  }

  return r;
}
```

And this is the refactored version:
```cleanFunctions.js
const TAX_RATE_WITH_DISCOUNT = 0.15;
const TAX_RATE_STANDARD = 0.1;
const BONUS_THRESHOLD = 10;

const CATEGORY_BONUS = {
  A: 2,
  B: 4,
  C: 6,
};

function calculateTotal(items, requiredType, minimumValue, hasDiscount) {
  let total = 0;
  let qualifiedItemCount = 0;

  for (const item of items) {
    if (hasInvalidValue(item)) {
      logError();
      continue;
    }

    total += calculateItemContribution(
      item,
      requiredType,
      minimumValue,
      hasDiscount,
      () => qualifiedItemCount++
    );

    total += getCategoryBonus(item.category);
  }

  return applyBulkPenalty(total, qualifiedItemCount);
}

function hasInvalidValue(item) {
  return item.value < 0;
}

function logError() {
  console.log("Something went wrong");
}

function calculateItemContribution(
  item,
  requiredType,
  minimumValue,
  hasDiscount,
  onQualified
) {
  if (item.type !== requiredType) {
    return 0;
  }

  if (item.value > minimumValue) {
    onQualified();
    return item.value * getTaxRate(hasDiscount);
  }

  if (item.hasExtraFee) {
    return 5;
  }

  return 0;
}

function getTaxRate(hasDiscount) {
  return hasDiscount ? TAX_RATE_WITH_DISCOUNT : TAX_RATE_STANDARD;
}

function getCategoryBonus(category) {
  return CATEGORY_BONUS[category] ?? 0;
}

function applyBulkPenalty(total, qualifiedItemCount) {
  if (qualifiedItemCount > BONUS_THRESHOLD) {
    return total - 3;
  }
  return total;
}
```
---
## What were the issues with duplicated code?
The issue in the code example (DRYPrinciples.js) is that the original function had the same business logic for each order category, which is error prone in the long run, if a price limit changes for a specific category it can be hard to spot the specific line that has that logic, and also requires more mental power in order to read the same code over and over again.
## How did refactoring improve maintainability?
The maintainability was improve by splitting the code in 2 function, the main one has the category validation, this split responsibility and provide a better way to debug the code, the second function is responsible for calculating the correct price, and if in the future the discount changes for 1 specific category, it can be implemented in its own function, this provides a safer way to expand use cases.

---
## What made the original code complex?
It made overly complicated things just to do simple things, like validating that user is an object, which in the context of the function (checking if the user is an adult and is active) is unnecessary, and uses a switch when is checking for a boolean basically
## How did refactoring improve it?
It improve by written all the logic from the over-complicated logic in just a line, which is more simple and maintainable
## Refactoring Techniques
There's a great resource to learn more about this topis and Design Patterns, here's the link:
https://refactoring.guru/refactoring/techniques
## Tasks
For the tasks I made an over-complicated function:
```OverComplicated.js
function checkUser(user) {
  return !!(
    user &&
      typeof user === "object" &&
      "age" in user &&
      Number.isInteger(user.age) &&
      user.age >= 18 &&
      "status" in user &&
      (function () {
        switch (user.status) {
          case "active":
            return true
          case "inactive":
            return false
          default:
            return false
        }
      })()
  )
}
```
And then I refactor it in a single line, which is more maintainable and easy to understand:
```OverComplicated.js
function isActiveAdult(user) {
  return user.age >= 18 && user.status === "active";
}
```
You can find the relevant commit here:
https://github.com/Zheng5005/Zheng5005-intern-repo/commit/b856d975e57e48382914394a523a24c1bc3b5f76

---
## When should you add comments?
Most developers agree that comments aren't strictly necessary, but in some cases can be useful, for example:
- To explain why you implemented something in a specific way (this is more useful than just describing the behavior of the code)
- To use it as documentation (in this case always make sure to update this comments as well, cause outdated documentation can be more harmful than no documentation at all)
- If you are doing a comment for a TODO, try to make it this way:
    - `TODO (@Co-woker): add [implementation required], at the moment it crashes when it merge with CO-WORKER_NAME implementation` 
## When should you avoid comments and instead improve the code?
- When is redundant, if a simple function needs comments to understand what is is doing, it isn't following clean code principles
- When a function is hard to follow, instead of writing the behavior of the code, it's better to re-factor it
---
# Issue #39
## What was the issue with the original code?
The function "isActiveAdult" handles a user object input, but at the beginning, it didn't take into account that the user object could miss the necessary fields, or those fields could be of another type that the functions needs.
## How does handling errors improve reliability
Now with the Refactoring, the function is more secure in the sense that now can handle some edge cases and act accordingly, it also provides more reliability by making sure the fields required are actually in the user object.
## Tasks
For the task I use the previous function of the Issue #41 that is already simplyfied (https://github.com/Zheng5005/Zheng5005-intern-repo/blob/main/clean_code/OverComplicatedCode.js):
```OverComplicated.js
function isActiveAdult(user) {
  return user.age >= 18 && user.status === "active";
}
```
Then I thought every edge case that this function can encounter and write some Guard clauses:
```OverComplicated.js
function isActiveAdult(user) {
  if(!user.age || !user.status) return "Pass a valid User object"
  if(user.age <= 0) return "Pass a valid age"
  if(typeof user.age !== 'number') return "Age is not a number"
  if(typeof user.status !== 'string') return "Pass a valid status"

  return user.age >= 18 && user.status === "active";
}
```
---
## How do unit tests help keep code clean?
- They encourage simple and focused code, a code that is hard to test is a sign that is doing too much
- Enforce better naming and structure
- It makes refactoring safer
- They can act as a documentation
- Makes quickfixes easier to implement
## What issues did you find while testing?
I use the same function of the previous Issue (handling Edge cases) so I write unit test for each edge case I could think of, in this case I write the test with vitest cause I'm more familiar with this tool.
## Tasks
I use the same file of the Issue #39 which was centered is edge cases, I took every edge case that I could think of and made them into a unit test.
where is the function tested: https://github.com/Zheng5005/Zheng5005-intern-repo/tree/main/clean_code/clean_code_project/src
```OverComplicated.js
export function isActiveAdult(user) {
  if(!user.age || !user.status) return "Pass a valid User object"
  if(user.age <= 0) return "Pass a valid age"
  if(typeof user.age !== 'number') return "Age is not a number"
  if(typeof user.status !== 'string') return "Pass a valid status"

  return user.age >= 18 && user.status === "active";
}
```

and this is the unit tests, it was wrote with vitest: https://github.com/Zheng5005/Zheng5005-intern-repo/blob/main/clean_code/clean_code_project/tests/isAdult.test.js
```isAdult.test.js
import { describe, expect, it } from "vitest";
import { isActiveAdult } from "../src/OverComplicatedCode";

describe('isActiveAdult', () => {
  it('returns true if user have an age greater than 18 and has a status of "active"',() => {
    const validUser = {age: 25, status: "active"}
    const res = isActiveAdult(validUser)

    expect(res).toBe(true)
  })

  it('returns "Pass a valid User object" if the user miss age and status field',() => {
    const invalidUserObject = {name: "John", country: "Canada"}
    const res = isActiveAdult(invalidUserObject)

    expect(res).toBe("Pass a valid User object")
  })

  it('returns "Pass a valid age" if the age field is negative',() => {
    const edgeCaseAgeNegative = {age: -45, status: "inactive"}
    const res = isActiveAdult(edgeCaseAgeNegative)

    expect(res).toBe("Pass a valid age")
  })

  it('returns "Age is not a number" if the age field is not a number',() => {
    const edgeCaseAgeNotNumber = {age: "45", status: "inactive"}
    const res = isActiveAdult(edgeCaseAgeNotNumber)

    expect(res).toBe("Age is not a number")
  })

  it('returns "Pass a valid status" if the status field is not "active" nor "inactive"',() => {
    const edgeCaseStatus = {age: 50, status: 1}
    const res = isActiveAdult(edgeCaseStatus)

    expect(res).toBe("Pass a valid status")
  })
})
```
