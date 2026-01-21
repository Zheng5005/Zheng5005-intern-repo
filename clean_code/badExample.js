// This is a example of a piece of code that don't follow clean code principles
function h(a, b, c) { // The function name isn't descriptive at all
  let x = 0; // Without an explanation, the meaning of "x" if confusing
  for (let i = 0; i < a.length; i++) { // By the context, it can be assumed that a is an array, but is intuitive enough
    if (a[i].t === b && a[i].v > c) {
      x += a[i].v * 1.13; // The goal of this operation is unclear
    }
  }
  return x;
}

const orders = [
  {t: "shoes", v: 200}, 
  {t: "shirt", v: 20}, 
  {t: "shoes", v: 150}
];

console.log(h(orders, "shoes", 1)); // Output: 395.5
