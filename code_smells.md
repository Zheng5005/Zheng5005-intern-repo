## What code smells did you find in your code?
- Variables names with not descriptive names
- Magic number and strings without an explanation
- Nested if statements
- A God Object that tries to manage everything
## How did refactoring improve the readability and maintainability of the code?
- By splitting the God Object, it made some functions more testable
- Getting rid of Magic number and strings made for more centralized constants, meaning that if in the future those number change, it can be easier to implement that.
- Deleting nested if statements make more readable code
## How can avoiding code smells make future debugging easier?
By avoiding code smells, the code can be more maintainable in the long run, without things like **Magic number and strings** or **Long functions** new developers can approach the codebase without much stress, also code smells like **God objects** makes the codebase to loaded and makes code  review very hard.
## Tasks
The original (codeSmells.js) and the fix version (fixVersion.js) can be find in this directory of the On-boarding repo:
https://github.com/Zheng5005/Zheng5005-intern-repo/tree/main/clean_code/codeSmells

but the original code is:
```codeSmells.js
class DataManager {
  constructor() {
    this.a = [];
    this.b = 0;
    this.temp = null;
  }

  process(x, y) {
    // Magic numbers & strings
    if (x > 42 && y === "ok") {
      // Deeply nested conditionals
      if (x < 100) {
        if (this.b === 0) {
          if (y !== "fail") {
            this.b = this.b + 1;
          } else {
            this.b = this.b + 2;
          }
        } else {
          if (this.b > 10) {
            this.b = this.b - 5;
          }
        }
      }
    }

    for (let i = 0; i < this.a.length; i++) {
      console.log("Item:", this.a[i]);
    }

    // Long function (doing way too much)
    let r = 0;
    for (let i = 0; i < 50; i++) {
      if (i % 3 === 0) {
        r += i * 2;
      } else {
        r += i / 2;
      }
    }

    // Inconsistent naming
    let totalSum = r;
    let ts = totalSum + this.b;
    let FINAL = ts;

    return FINAL;
  }

  // More responsibilities added to the same class
  save(data) {
    this.a.push(data);
  }

  remove(index) {
    this.a.splice(index, 1);
  }

  printEverything() {
    console.log(this.a);
    console.log(this.b);
  }
}

// Usage
const dm = new DataManager();
dm.save(1);
dm.save(2);
dm.process(55, "ok");
dm.printEverything();
```

and the refactored version is:
```fixVersion.js
const LIMITS = {
  MIN_VALUE: 42,
  MAX_VALUE: 100,
  LOOP_COUNT: 50
}

const STATUS = {  
  OK: "ok",
  FAIL: "fail"
}

export function calculateScore() {
  let score = 0;

  for (let i = 0; i < LIMITS.LOOP_COUNT; i++) {
    score += i % 3 === 0 ? i * 2 : i/2;
  }

  return score
}

export function isValidInput(value, status) {
  return (
    value > LIMITS.MIN_VALUE &&
    value < LIMITS.MAX_VALUE &&
    status !== STATUS.FAIL
  )
}

export function logItems(items) {
  items.forEach(item => console.log("Item: ", item));
}

export class DataStore {
  constructor() {
    this.items = [];
    this.counter = 0
  }

  addItem(item) {
    this.items.push(item)
  }

  removeItem(index) {
    this.items.splice(index, 1)
  }

  incrementCounter(amount = 1) {
    this.counter += amount;
  }
}

export class DataService {
  constructor(store) {
    this.store = store
  }

  processData(value, status) {
    if (!isValidInput(value, status)) return

    this.store.incrementCounter();
    logItems(this.store.items)

    const score = calculateScore()
    return score + this.store.counter
  }
}

const store = new DataStore()
const service = new DataService(store)

store.addItem(1)
store.addItem(2)

const res = service.processData(55, STATUS.OK)
console.log("Result", res)
```
