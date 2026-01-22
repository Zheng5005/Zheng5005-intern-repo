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
