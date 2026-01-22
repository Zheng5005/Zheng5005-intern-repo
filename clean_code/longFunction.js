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

