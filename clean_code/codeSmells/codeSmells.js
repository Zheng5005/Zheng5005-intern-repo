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


