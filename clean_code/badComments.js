function calc(a, b) {
  // set x to a
  let x = a;

  // do stuff
  let y = x + b;

  // check if y is greater than 10
  if (y > 10) {
    // increase y by 2
    y = y + 2;
  } else {
    // decrease y by 2
    y = y - 2;
  }

  // return y
  return y;
}

console.log(calc(3, 8))
