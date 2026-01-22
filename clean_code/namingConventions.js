// Bad naming conventions example
function d(u, f) { // the name isn't descriptive enough, what it does?
  let r = 0; // What "r" means in this context?
  for (let i = 0; i < u.length; i++) { // What does this?, and Why is here?
    if (u[i].a && u[i].s === f) {
      r += u[i].p * 0.2; // It's calculating something, but is hard to decypher
    }
  }
  return r;
}

function calculateServiceFee(users, requiredStatus) { // function and variables names are descriptive enough
  const SERVICE_FEE_RATE = 0.2; // Has a name that can be interpreted without any questions
  let totalFee = 0;

  for (const user of users) { // Now the goal of this loop is clear
    if (user.isActive && user.status === requiredStatus) {
      totalFee += user.price * SERVICE_FEE_RATE; // That you can understand now that is calculating a fee
    }
  }

  return totalFee;
}
