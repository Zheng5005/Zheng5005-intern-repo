// Example of an overcomplicated code that checks is an user is an adult and is active
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

// Simplifying the code
function isActiveAdult(user) {
  return user.age >= 18 && user.status === "active";
}

user1 = {age: 15, status: "active"}
user2 = {age: 20, status: "inactive"}
validUser = {age: 25, status: "active"}

console.log(checkUser(user2))
console.log(isActiveAdult(validUser))
