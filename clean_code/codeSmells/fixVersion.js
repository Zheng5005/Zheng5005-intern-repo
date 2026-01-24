const LIMITS = {
  MIN_VALUE: 42,
  MAX_VALUE: 100,
  LOOP_COUNT: 50,
};

const STATUS = {
  OK: "ok",
  FAIL: "fail",
};

export function calculateScore() {
  let score = 0;

  for (let i = 0; i < LIMITS.LOOP_COUNT; i += 1) {
    score += i % 3 === 0 ? i * 2 : i / 2;
  }

  return score;
}

export function isValidInput(value, status) {
  return (
    value > LIMITS.MIN_VALUE &&
    value < LIMITS.MAX_VALUE &&
    status !== STATUS.FAIL
  );
}

export function logItems(items) {
  items.forEach((item) => {
    console.log("Item:", item);
  });
}

export class DataStore {
  constructor() {
    this.items = [];
    this.counter = 0;
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(index) {
    this.items.splice(index, 1);
  }

  incrementCounter(amount = 1) {
    this.counter += amount;
  }
}

export class DataService {
  constructor(store) {
    this.store = store;
  }

  processData(value, status) {
    if (!isValidInput(value, status)) {
      return null;
    }

    this.store.incrementCounter();
    logItems(this.store.items);

    const score = calculateScore();
    return score + this.store.counter;
  }
}

const store = new DataStore();
const service = new DataService(store);

store.addItem(1);
store.addItem(2);

const result = service.processData(55, STATUS.OK);
console.log("Result:", result);
