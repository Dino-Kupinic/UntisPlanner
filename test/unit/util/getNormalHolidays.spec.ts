import {describe, test, it, beforeAll, expect} from "vitest"

describe("getNormalHolidays", () => {
  it("returns a value", async () => {
    expect(getNormalHolidays(2024)).toBeDefined()
  })

  it("returns the correct type", async () => {
    expect(getNormalHolidays(2024)).toBeTypeOf("object")
  })
})
