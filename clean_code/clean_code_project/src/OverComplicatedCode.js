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
export function isActiveAdult(user) {
  if(!user.age || !user.status) return "Pass a valid User object"
  if(user.age <= 0) return "Pass a valid age"
  if(typeof user.age !== 'number') return "Age is not a number"
  if(typeof user.status !== 'string') return "Pass a valid status"

  return user.age >= 18 && user.status === "active";
}
